import { GetServerSideProps } from 'next';
import Button from '../../../components/Form/Button';

import Layout from '../../../components/Layout';

import MultiStep from '../../../components/Form/Multistep';
import Modal from '../../../components/Modal';
import ModalHeader from '../../../components/Modal/Header';

import TemplateTags from '../../../components/Template/Tags';
import OrderTitle from '../../../components/Order/Title';
import OrderInfo from '../../../components/Order/Info';
import OrderDetails from '../../../components/Order/Details';
import Totals from '../../../components/Order/Totals';
import {
  Container,
  OrderCardContainer,
  OrderItemContainer
} from '../../../styles/pages/order.styles';
import { useOrder, fetchOrder } from '../../../hooks/order';

import LoadingComponent from '../../../components/LoadingComponent';
import ErrorComponent from '../../../components/ErrorComponent';
import { formatOrderStepStatus } from '../../../services/formatOrderStepStatus';
import React from 'react';
import { FaRegFileVideo } from 'react-icons/fa';
import { fetchDownload } from '../../../hooks/download';
import { useMutation } from 'react-query';
import { IsOrderExpired } from '../../../services/formatTime';
import { OrderSteps as steps } from '../../../constants/orders';

const OrderCard = ({ order }) => {
  // this is the current order status step:
  const currentStep = formatOrderStepStatus(order, steps);

  return (
    <>
      <MultiStep currentStep={currentStep} steps={steps} />
      <hr />
      <OrderCardContainer>
        <OrderInfo order={order} />
        <OrderDetails order={order} />
        <h2>Resumo do Pedido</h2>
        {order.projects.map(project => (
          <OrderItem
            project={project}
            order={order}
            currentStep={currentStep}
            key={project.id}
          />
        ))}
        <Totals total={order.net_amount} subtotal={order.gross_amount} />
      </OrderCardContainer>
    </>
  );
};

const OrderItem = props => {
  const { id, name, description, category, duration, ratio } = props.project;

  const { currentStep } = props;

  // check if order is status 4: 'Download Disponível'
  const { created_at } = props.order;
  const isOrderExpired = IsOrderExpired(created_at);

  const isDownloadable = () => {
    // // If order already expired:
    if (isOrderExpired) {
      return false;
    }
    // If order is not status 3 or 4:
    if (currentStep.id !== 3) {
      return false;
    }
    // isDownloadable!
    return true;
  };

  return (
    <OrderItemContainer>
      <hr />
      <OrderTitle name={name} description={description} />
      <TemplateTags margin="0" tags={{ category, ratio, duration }} />
      <Download project={props.project} isDownloadable={isDownloadable()} />
    </OrderItemContainer>
  );
};

const Download = ({ project, isDownloadable }) => {
  const { id } = project;

  const [
    mutate,
    { isIdle, isLoading, isError, isSuccess, data, error, reset }
  ] = useMutation(fetchDownload);

  const handleDownload = () => {
    mutate(id);
  };

  return (
    <>
      <Button
        primary
        width="100%"
        onClick={handleDownload}
        isLoading={isLoading}
        disabled={!isDownloadable}
      >
        <FaRegFileVideo size="18px" />
        <span>Download video</span>
      </Button>
      {isError && (
        <ErrorComponent
          hasIcon={false}
          // @ts-ignore: Unreachable code error
          message={`Erro - O arquivo não existe ou já expirou.`}
        />
      )}
    </>
  );
};

const Order = ({ id }) => {
  const { isLoading, isError, error, data: order, isFetching } = useOrder(id);

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Meu Pedido" />
          {isLoading && <LoadingComponent message="Carregando o pedido..." />}
          {error && (
            <ErrorComponent
              hasIcon={true}
              message={`Ocorreu um erro ao carregar seu pedido - ${error.message}`}
            />
          )}
          {order && <OrderCard order={order} />}
        </Container>
      </Modal>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = String(context.params.id);

  return {
    props: { id } // will be passed to the page component as props
  };
};

export default Order;
