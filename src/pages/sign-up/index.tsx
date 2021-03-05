import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FiMail, FiLock } from 'react-icons/fi';
import { BiText } from 'react-icons/bi';

import Layout from '../../components/Layout';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Checkbox from '../../components/Form/Checkbox';

import { Container } from '../../styles/pages/signup.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import GoogleButton from '../../components/Form/GoogleButton';
import ErrorComponent from '../../components/ErrorComponent';
import ModalTerms from '../../components/ModalTerms';
import { redirectLoggedUser } from '../../services/redirects';
import { signUpSchema } from '../../schemas';
import { useAuth } from '../../hooks/auth';
import { useRouter } from 'next/router';

import ModalConfirmEmail from '../../components/ModalConfirmEmail';

type ISignUpInputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  terms?: boolean;
};

const SignUp = () => {
  const { isLoading, isError, signInGoogle, signUp } = useAuth();
  const router = useRouter();

  // const [isLoading, setLoading] = useState(false);
  const [signUpSuccess, setSignedUpSuccess] = useState(false);

  const { register, setValue, handleSubmit, errors } = useForm<ISignUpInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false
    }
  });

  const onSubmit = handleSubmit(
    async ({ name, email, password }: ISignUpInputs) => {
      try {
        await signUp({ name, email, password });
        setSignedUpSuccess(true);
      } catch {}
    }
  );

  const onSuccessRedirectToSignIn = () => {
    toast.success(`Redirecionando para a página de login.`);
    router.push('/sign-in');
  };

  const onGoogleSignIn = async () => {
    await signInGoogle();
  };

  return (
    <Layout>
      <Container>
        <h1>Crie sua conta</h1>
        <GoogleButton onClick={onGoogleSignIn}>
          Entrar com a conta Google
        </GoogleButton>
        <p>Ou use seu email para se registrar</p>
        <form onSubmit={onSubmit} method="post">
          <Input
            name="name"
            label="Nome"
            type="text"
            placeholder="Seu nome"
            icon={BiText}
            register={register}
            errors={errors}
          />
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
            label="Senha"
            placeholder="********"
            icon={FiLock}
            type="password"
            register={register}
            errors={errors}
          />
          <Input
            name="password_confirmation"
            label="Confirme sua Senha"
            placeholder="********"
            icon={FiLock}
            type="password"
            register={register}
            errors={errors}
          />
          <Checkbox
            name="terms"
            type="checkbox"
            register={register}
            errors={errors}
          >
            Concordo com os termos de uso e a politica de privacidade.
          </Checkbox>
          <ModalTerms />
          <ModalConfirmEmail
            isOpen={signUpSuccess}
            setOpen={setSignedUpSuccess}
            setRedirection={onSuccessRedirectToSignIn}
          />
          <Button type="submit" primary isLoading={isLoading}>
            Cadastrar
          </Button>
        </form>
        {isError.status && (
          <ErrorComponent hasIcon={false} message={isError.message} />
        )}
      </Container>
    </Layout>
  );
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = async context => {
  // Checks if user is logged, if so, redirect
  await redirectLoggedUser(context, '/projects');

  return {
    props: {} // will be passed to the page component as props
  };
};
