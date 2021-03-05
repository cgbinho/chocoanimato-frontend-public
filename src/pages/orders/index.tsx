import Button from '../../components/Form/Button';

import Modal from '../../components/Modal';
import ModalHeader from '../../components/Modal/Header';

import OrderInfo from '../../components/Order/Info';

import Layout from '../../components/Layout';

import { Container, OrderContainer } from '../../styles/pages/orders.styles';
import React, { useState } from 'react';
import { useOrders } from '../../hooks/orders';
import Pagination from '../../components/Pagination';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import { useRouter } from 'next/router';

const Orders = () => {
  const [page, setPage] = useState(0);

  const {
    isLoading,
    isError,
    error,
    resolvedData,
    latestData,
    isFetching
  } = useOrders({
    page
  });

  const handleNextPage = () => {
    setPage(old => old + 1);
  };

  const handlePrevPage = () => {
    // setPage(page - 1);
    setPage(old => Math.max(old - 1, 0));
  };

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Meus Pedidos" />
          {isLoading && <LoadingComponent message="Carregando resultados..." />}
          {error && (
            <ErrorComponent
              hasIcon={true}
              message={`Ocorreu um erro ao carregar os dados - ${error.message}`}
            />
          )}
          {resolvedData && <OrdersList orders={resolvedData.results} />}
          <Pagination
            page={page}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            page_total={resolvedData?.page_total}
            total={resolvedData?.total}
          />
          {
            // Since the last page's data potentially sticks around between page requests,
            // we can use `isFetching` to show a background loading
            // indicator since our `status === 'loading'` state won't be triggered
            isFetching ? <span> Loading...</span> : null
          }
        </Container>
      </Modal>
    </Layout>
  );
};

const OrdersList = ({ orders }) => {
  return (
    <>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </>
  );
};

const OrderCard = ({ order }) => {
  const {
    id,
    transaction_id,
    payment_method,
    payment_link,
    project_ids,
    gross_amount,
    discount_amount,
    net_amount,
    installment_count,
    status
  } = order;

  const router = useRouter();

  const handleOpenOrder = () => {
    router.push(`/orders/${order.id}`);
  };

  return (
    <OrderContainer>
      <hr />
      <OrderInfo order={order} />
      <Button primary width="100%" onClick={handleOpenOrder}>
        Ver Pedido
      </Button>
    </OrderContainer>
  );
};

export default Orders;
