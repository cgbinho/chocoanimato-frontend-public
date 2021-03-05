import React from 'react';
import { withAuth } from '../../components/WithAuth';
import { withAuthServerSideProps } from '../../hoc/withAuthServerSide';
import { useForm } from 'react-hook-form';

import { FiMail, FiLock } from 'react-icons/fi';
import { BiText } from 'react-icons/bi';

import Layout from '../../components/Layout';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

import { Container, SocialContainer } from '../../styles/pages/profile.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileSchema } from '../../schemas';
import { useAuth } from '../../hooks/auth';
import { useRouter } from 'next/router';

import ErrorComponent from '../../components/ErrorComponent';
import SuccessComponent from '../../components/SuccessComponent';

type IFormInputs = {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
};

type IProfileUpdateData = {
  name: string;
  email: string;
  password: string;
};

const Profile = ({ user }) => {
  const { isSuccess, isLoading, isError, updateProfile } = useAuth();
  // const { name, email, provider } = user;
  const { name, email, provider } = user;

  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    errors,
    reset: resetForm
  } = useForm<IFormInputs>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name,
      email
    }
  });

  const onSubmit = handleSubmit(async (data: IFormInputs) => {
    try {
      updateProfile(data);
    } catch {}
  });

  const ClassicContainer = () => {
    return (
      <>
        <h1>Editar Perfil</h1>
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
            name="old_password"
            label="Senha atual"
            placeholder="********"
            autoComplete="off"
            icon={FiLock}
            type="password"
            register={register}
            errors={errors}
          />
          <Input
            name="password"
            label="Senha nova"
            placeholder="********"
            autoComplete="off"
            icon={FiLock}
            type="password"
            register={register}
            errors={errors}
          />
          <Input
            name="password_confirmation"
            label="Confirme sua Senha nova"
            placeholder="********"
            autoComplete="off"
            icon={FiLock}
            type="password"
            register={register}
            errors={errors}
          />
          <Button type="submit" primary isLoading={isLoading}>
            Atualizar
          </Button>
        </form>
        {isSuccess && (
          <SuccessComponent hasIcon={false} message={isSuccess.message} />
        )}
        {isError && (
          <ErrorComponent hasIcon={false} message={isError.message} />
        )}
      </>
    );
  };

  const SocialAccount = () => {
    return (
      <SocialContainer>
        <h2>
          Olá, <br /> {name}!
        </h2>
        <p>
          Você está logado com sua conta <br />
          <em>{email}</em> do <em>{provider}.</em>
        </p>
        <small>Não é possível atualizar seus dados por este site.</small>
        <Button primary onClick={() => router.back()}>
          Voltar
        </Button>
      </SocialContainer>
    );
  };

  return (
    <Layout>
      <Container>
        {provider !== 'classic' ? <SocialAccount /> : <ClassicContainer />}
      </Container>
    </Layout>
  );
};

export default withAuth(Profile);
export const getServerSideProps = withAuthServerSideProps();
