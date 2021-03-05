import React from 'react';
import Layout from '../../components/Layout';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { BiPencil, BiText } from 'react-icons/bi';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

import { Container } from '../../styles/pages/contact.styles';
import { contactSchema } from '../../schemas';
import { postMessage } from '../../queries/contact';
import { useMutation } from 'react-query';

import ErrorComponent from '../../components/ErrorComponent';
import SuccessComponent from '../../components/SuccessComponent';

type IFormInputs = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    reset: resetForm
  } = useForm<IFormInputs>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: null,
      email: null,
      message: null
    }
  });

  const [
    mutate,
    { isIdle, isLoading, isError, isSuccess, data, reset }
  ] = useMutation(postMessage);

  const onSubmit = handleSubmit(
    async ({ name, email, message }: IFormInputs) => {
      mutate({ name, email, message });
      resetForm({ name: null, email: null, message: null });
    }
  );

  return (
    <Layout>
      <Container>
        <h1>Contato</h1>
        <p>Quer um vídeo personalizado diferente? Podemos ajudá-lo!</p>
        <p>
          <em>
            <strong> contato @ chocoanimato . com </strong>
          </em>
        </p>
        <p>Ou envie uma mensagem pelo formulário:</p>

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
            name="message"
            label="Mensagem"
            type="text"
            placeholder="Escreva aqui sua mensagem"
            icon={BiPencil}
            register={register}
            errors={errors}
          />
          <Button type="submit" primary isLoading={isLoading}>
            Enviar Mensagem
          </Button>
        </form>
        {isSuccess && (
          <SuccessComponent
            hasIcon={false}
            message="Mensagem enviada com sucesso!"
          />
        )}
        {isError && (
          <ErrorComponent
            hasIcon={false}
            message="Ocorreu um erro no envio da mensagem, tente novamente."
          />
        )}
      </Container>
    </Layout>
  );
};

export default Contact;
