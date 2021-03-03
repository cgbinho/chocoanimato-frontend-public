import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Button from '../../../components/Form/Button';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../hooks/auth';
import {
  redirectLoggedUser,
  redirectUserWithInvalidQuery
} from '../../../services/redirects';
import { IconContainer } from '../../../styles/pages/checkout.styles';
import { Container } from '../../../styles/pages/signincallback.styles';
import { ISignInCallbackProps } from '../../../types';

const SignInCallback = ({ user, token, provider }: ISignInCallbackProps) => {
  const { signInCallback } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  /*  REDIRECT LOGGED USER TO PROJECTS  */
  useEffect(() => {
    if (user && token && provider) {
      signInCallback({ user, token, provider });
      const timer = setTimeout(() => {
        router.push('/templates');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const submitRedirection = () => {
    setLoading(true);
    router.push('/templates');
  };

  const ClassicAccount = () => {
    return (
      <p>
        Você está logado com seu email <br />
        <em>{user.email}</em>.
      </p>
    );
  };

  const SocialAccount = () => {
    return (
      <p>
        Você está logado com sua conta <br />
        <em>{user.email}</em>
        <br />
        do <em>{provider}</em>.
      </p>
    );
  };

  return (
    <Layout>
      <Container>
        <h1>
          Olá, <br /> {user.name}!
        </h1>
        <IconContainer>
          <IoMdCheckmarkCircleOutline size={62} />
        </IconContainer>
        {provider === 'classic' ? <ClassicAccount /> : <SocialAccount />}
        <Button onClick={submitRedirection} primary isLoading={isLoading}>
          Comece a criar seus vídeos clicando aqui
        </Button>
        <p>ou aguarde ser redirecionado automaticamente...</p>
      </Container>
    </Layout>
  );
};

export default SignInCallback;

export const getServerSideProps: GetServerSideProps = async context => {
  // Checks if user is logged, if so, redirect
  await redirectLoggedUser(context, '/projects');
  // checks if context.query is valid ( token,user,provider), if not, redirect:
  await redirectUserWithInvalidQuery(context);

  const { token, provider } = context.query;
  const user = JSON.parse(String(context.query.user));

  return {
    props: { token, user, provider } // will be passed to the page component as props
  };
};

/*
http://localhost:4444/sign-in-callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQwNjY2MjcsImV4cCI6MTYwNDY3MTQyNywic3ViIjoiMmZjN2Q0MTAtODlhZC00YWJiLWJjMzQtMTBhZTk4NDE0OTI5In0.YlHnZ4JtaDn_Z3FQJZF0vbMep4eXaATHDlHD8uh8_Ag&user=%7B%22id%22:%222fc7d410-89ad-4abb-bc34-10ae98414929%22,%22name%22:%22Cleber%20Galves%20Bordin%22,%22email%22:%22cgbinho@gmail.com%22,%22is_verified%22:true%7D&provider=google#
*/
