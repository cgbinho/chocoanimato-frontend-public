// import cookie from 'cookie';
import { GetServerSideProps } from 'next';

import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';

import Layout from '../../components/Layout';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

import { Container } from '../../styles/pages/signin.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../../schemas';
import GoogleButton from '../../components/Form/GoogleButton';

import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import { useRouter } from 'next/router';

import { ISignInProps } from '../../types';

import { redirectLoggedUser } from '../../services/redirects';
import ErrorComponent from '../../components/ErrorComponent';

const SignIn = () => {
  const { isLoading, isError, signIn, signInGoogle } = useAuth();

  const router = useRouter();

  const { register, setValue, handleSubmit, errors } = useForm<ISignInProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = handleSubmit(async ({ email, password }: ISignInProps) => {
    try {
      await signIn({ email, password });
      router.push('/templates');
    } catch {}
  });

  const onGoogleSignIn = async () => {
    try {
      await signInGoogle();
      // router.push('/templates');
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return (
    <Layout>
      <Container>
        <h1>Olá,</h1>
        <GoogleButton onClick={onGoogleSignIn}>
          Entrar com a conta Google
        </GoogleButton>
        <p>Ou faça login com sua conta</p>
        <form onSubmit={onSubmit} method="post">
          <Input
            name="email"
            label="Email"
            type="text"
            placeholder="seu@email.com"
            icon={FiMail}
            register={register}
            errors={errors}
          />
          <Input
            name="password"
            label="Password"
            placeholder="********"
            icon={FiLock}
            type="password"
            register={register}
            errors={errors}
          />
          <a href="#">Esqueceu a senha?</a>
          <Button type="submit" primary isLoading={isLoading}>
            Entrar
          </Button>
        </form>
        {isError.status && (
          <ErrorComponent hasIcon={false} message={isError.message} />
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  // Checks if user is logged, if so, redirect
  await redirectLoggedUser(context, '/projects');

  return {
    props: {} // will be passed to the page component as props
  };
};

export default SignIn;
