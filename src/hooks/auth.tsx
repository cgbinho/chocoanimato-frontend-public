import React, { createContext, useCallback, useState, useContext } from 'react';
import Router from 'next/router';
import axios from '../services/api';
import cookie from 'js-cookie';

import {
  IUserProps,
  ISignInCallbackProps,
  AuthState,
  ISignInProps,
  ISignUpCredentials
} from '../types';

interface IsMessageData {
  status: boolean;
  message: string;
}

interface IUpdateProfileData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

interface AuthContextData {
  user: IUserProps;
  isLoading: boolean;
  isError: IsMessageData;
  isSuccess: IsMessageData;
  signIn(credentials: ISignInProps): Promise<any>;
  signInGoogle(): Promise<void>;
  signInCallback(data: ISignInCallbackProps): void;
  signOut(): void;
  signUp(data: ISignUpCredentials): Promise<void>;
  updateProfile(data: IUpdateProfileData): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ status: false, message: null });
  const [isSuccess, setSuccess] = useState({ status: false, message: null });
  const [data, setData] = useState<AuthState>(() => {
    const token = cookie.get('chocoanimatoToken');
    const user = cookie.get('chocoanimatoUser');
    // const provider = cookie.get('chocoanimatoProvider');

    if (token && user) {
      axios.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    // if (typeof window !== 'undefined') {
    //   const token = window.localStorage.getItem('@ChocoAnimato: token');
    //   const user = window.localStorage.getItem('@ChocoAnimato: user');
    //   const provider = window.localStorage.getItem('@ChocoAnimato: provider');

    //   if (token && user && provider) {
    //     axios.defaults.headers.authorization = `Bearer ${token}`;
    //     return { token, user: JSON.parse(user), provider };
    //   }
    // }

    return {} as AuthState;
  });

  const signUp = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/users`, {
        name,
        email,
        password
      });
      return data;
    } catch (err) {
      setError({
        status: true,
        message: `Não foi possível criar a conta - ${err.response.data.message}`
      });
      throw new Error(
        `${err.response.data.message}. Não foi possível cadastrar o usuário.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/sessions', {
        email,
        password
      });
      const { token, user: userData, provider } = response.data;
      const user = { provider, ...userData };
      setCookies({ token, user });
      // setLocalStorage({ token, user });
      axios.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
    } catch (err) {
      setError({
        status: true,
        message: `Não foi possível entrar com a sua conta - ${err.response.data.message}`
      });
      throw new Error(
        `${err.response.data.message}. Não foi possível entrar com a sua conta.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const signInGoogle = useCallback(async () => {
    try {
      const response = await axios.get('/api/sessions/google');

      const { url } = response.data;
      Router.push(url);
    } catch (err) {
      throw new Error(
        `${err.response.data.message}. Não foi possível fazer o login.`
      );
    }
  }, []);

  const signInCallback = useCallback(
    ({ token, user: userData, provider }: ISignInCallbackProps) => {
      const user = { provider, ...userData };
      setCookies({ token, user });
      axios.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
    },
    []
  );

  const updateProfile = useCallback(
    async (data: IUpdateProfileData) => {
      setLoading(true);
      try {
        const response = await axios.put(`/api/profile`, data);

        setData(state => {
          // update user and add provider:
          const user = { provider: state.user.provider, ...response.data };

          cookie.set('chocoanimatoUser', JSON.stringify(user), {
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: 7,
            sameSite: 'strict'
          });
          setSuccess({
            status: true,
            message: 'Perfil atualizado com sucesso!'
          });

          return {
            ...state,
            user
          };
        });
      } catch (err) {
        setError({
          status: true,
          message: `Não foi possível atualizar o Perfil - ${err.response.data.message}`
        });
        throw new Error(
          `${err.response.data.message}. Não foi possível atualizar o Perfil.`
        );
      } finally {
        setLoading(false);
      }
    },
    [setData, data.token]
  );

  const signOut = useCallback(() => {
    // delete cookies:
    cookie.remove('chocoanimatoToken');
    cookie.remove('chocoanimatoUser');
    // delete localStorage
    window.localStorage.removeItem('@ChocoAnimato: Checkout');

    setData({} as AuthState);
  }, []);

  // SET COOKIE HELPER USED ON SIGNIN, SIGNINGOOGLE, etc.
  const setCookies = ({ token, user }: ISignInCallbackProps): void => {
    // set cookies:
    cookie.set('chocoanimatoToken', token, {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: 7,
      sameSite: 'strict'
    });
    cookie.set('chocoanimatoUser', JSON.stringify(user), {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: 7,
      sameSite: 'strict'
    });
  };

  const setLocalStorage = ({
    token,
    user,
    provider
  }: ISignInCallbackProps): void => {
    window.localStorage.setItem('@ChocoAnimato: provider', provider);
    window.localStorage.setItem('@ChocoAnimato: token', token);
    window.localStorage.setItem('@ChocoAnimato: user', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        isLoading,
        isError,
        isSuccess,
        signUp,
        signIn,
        signInGoogle,
        signOut,
        signInCallback,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
