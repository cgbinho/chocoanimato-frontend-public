import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useForm, Controller } from 'react-hook-form';

import Button from '../../../components/Form/Button';
import { BiText } from 'react-icons/bi';
import { AiOutlineNumber } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';

import Layout from '../../../components/Layout';

import MultiStep from '../../../components/Form/Multistep';
import Modal from '../../../components/Modal';
import ModalHeader from '../../../components/Modal/Header';
import Input from '../../../components/Form/Input';

import { Container } from '../../../styles/pages/checkout.personal.styles';
import { FormContainer } from '../../../styles/pages/checkout.styles';
import { useCheckout } from '../../../hooks/checkout';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkoutPersonalSchema } from '../../../schemas';

import { CheckoutSteps as steps } from '../../../constants/checkout';
import { cpfMask } from '../../../validations/fieldMasks';
import { CpfSanitization } from '../../../validations/inputSanitization';
import { withAuth } from '../../../components/WithAuth';
import { withAuthServerSideProps } from '../../../hoc/withAuthServerSide';
import appConfig from '../../../config/app';

type IFormInputs = {
  payer: {
    name: string;
    email: string;
    tax_id: string;
  };
};

const defaultValues =
  appConfig.node_env === 'development'
    ? {
        payer: {
          name: 'Jose da Silva',
          email: 'comprador@sandbox.pagseguro.com.br',
          tax_id: '332.365.978-36'
        }
      }
    : null;

const Form: React.FC = () => {
  const { isLoading, checkout, addPayer } = useCheckout();
  const router = useRouter();

  const { register, setValue, handleSubmit, errors, control } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(checkoutPersonalSchema),
    defaultValues
  });

  const onSubmit = handleSubmit(({ payer }) => {
    // Sanitize values:
    const tax_id = CpfSanitization(payer.tax_id);
    // add to checkout context:
    addPayer({ ...payer, tax_id });
    // redirect:
    router.push('/checkout/address');
  });

  return (
    <FormContainer>
      <form onSubmit={onSubmit} method="post">
        <Input
          name="payer.name"
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          icon={BiText}
          register={register}
          errors={errors}
        />
        <Input
          name="payer.tax_id"
          label="CPF"
          type="text"
          placeholder="000.000.000-00"
          icon={AiOutlineNumber}
          register={register}
          errors={errors}
          onChange={cpfMask}
        />
        <Input
          name="payer.email"
          label="Email"
          type="text"
          placeholder="seu@email.com"
          icon={FiMail}
          register={register}
          errors={errors}
        />
        <pre>{JSON.stringify(checkout, null, 2)}</pre>
        <Button type="submit" primary isLoading={isLoading}>
          Avançar
        </Button>
      </form>
    </FormContainer>
  );
};

const CheckoutPersonal: React.FC = () => {
  // this is the current order status step:
  const currentStep = { id: 1, name: 'Dados Pessoais' };

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Meu Pedido" />
          <MultiStep currentStep={currentStep} steps={steps} />
          <hr />
          <Form />
        </Container>
      </Modal>
    </Layout>
  );
};

export default withAuth(CheckoutPersonal);
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
