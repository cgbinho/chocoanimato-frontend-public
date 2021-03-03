import React, { createContext, useCallback, useState, useContext } from 'react';
import { QueryResult, useMutation, useQuery } from 'react-query';
import axios from '../services/api';
import cookie from 'js-cookie';
import Router from 'next/router';

import {
  IUserProps,
  ISignInCallbackProps,
  AuthState,
  ISignInProps,
  ISignUpCredentials
} from '../types';
import { postSignIn } from '../queries/signin';

// interface AuthContextData {
//   user: IUserProps;
//   provider: string;
//   signIn(credentials: ISignInProps): Promise<any>;
// }

export const useSignIn = async ({ email, password }) => {
  // const [data, setData] = useState();
  // const [isLoading, setLoading] = useState(false);
  // const [isError, setError] = useState(false);

  const [mutate, { isLoading, isError, isSuccess, data, reset }] = useMutation(
    postSignIn
  );

  await mutate({ email, password });

  return [data, isLoading, isError];
};
