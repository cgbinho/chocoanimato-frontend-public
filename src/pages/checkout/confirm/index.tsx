import Button from '../../../components/Form/Button';
import { FiEdit } from 'react-icons/fi';

import Layout from '../../../components/Layout';

import MultiStep from '../../../components/Form/Multistep';
import Modal from '../../../components/Modal';
import ModalHeader from '../../../components/Modal/Header';

import TemplateTags from '../../../components/Template/Tags';
import OrderTitle from '../../../components/Order/Title';
import Price from '../../../components/Order/Price';
import OrderTotals from '../../../components/Order/Totals';
import { CheckoutSteps as steps } from '../../../constants/checkout';
import { withAuth } from '../../../components/WithAuth';
import { withAuthServerSideProps } from '../../../hoc/withAuthServerSide';

import {
  Container,
  Content,
  UserDataContainer,
  OrderDataContainer
} from '../../../styles/pages/checkout.confirm.styles';

import { useCheckout } from '../../../hooks/checkout';
import React from 'react';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { postCheckoutOrder } from '../../../queries/checkout';

import ErrorComponent from '../../../components/ErrorComponent';
import { useRouter } from 'next/router';
import LoadingComponent from '../../../components/LoadingComponent';
import { UserData } from '../../../components/Order/ConfirmData';
import { OrderData } from '../../../components/Order/ConfirmData/OrderData';
import { GetServerSideProps } from 'next';

const CheckoutConfirm = () => {
  const router = useRouter();
  const currentStep = { id: 4, name: 'Confirmação do Pedido' };

  const { checkout } = useCheckout();

  // Mutation to submit data:
  const [
    mutate,
    { isIdle, isLoading, isError, isSuccess, data, reset }
  ] = useMutation(postCheckoutOrder, {
    onSuccess: async order => {
      router.push(`/checkout/success/${order.id}`);
    }
  });

  const handleSubmitOrder = async () => {
    mutate(checkout);
  };

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Meu Pedido" />
          <MultiStep currentStep={currentStep} steps={steps} />
          <hr />
          <Content>
            {isLoading && <LoadingComponent message="Enviando pedido..." />}
            {isError && (
              <ErrorComponent
                hasIcon={true}
                message={`Ocorreu um erro ao enviar o seu pedido`}
              />
            )}
            {!isSuccess && (
              <>
                <UserData checkout={checkout} />
                <pre>{JSON.stringify(checkout, null, 2)}</pre>
                <OrderData
                  checkout={checkout}
                  handleSubmitOrder={handleSubmitOrder}
                  isLoading={isLoading}
                  isError={isError}
                />
              </>
            )}
          </Content>
        </Container>
      </Modal>
    </Layout>
  );
};

export default withAuth(CheckoutConfirm);
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
