import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Button from '../../../../components/Form/Button';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import Layout from '../../../../components/Layout';

import {
  Container,
  Content,
  IconContainer
} from '../../../../styles/pages/checkout.success.styles';

import OrderBoletoInfo from '../../../../components/Order/BoletoInfo';
import OrderCard from '../../../../components/Order/Card';
import { useCheckout } from '../../../../hooks/checkout';

import React, { useEffect } from 'react';
import { useOrder } from '../../../../hooks/order';
import { withAuth } from '../../../../components/WithAuth';
import { withAuthServerSideProps } from '../../../../hoc/withAuthServerSide';
// type IFormInputs = {
//   name: string;
//   email: string;
//   password: string;
// };

// const order = {
//   object: 'transaction',
//   status: 'processing',
//   refuse_reason: null,
//   status_reason: 'acquirer',
//   acquirer_response_code: null,
//   acquirer_name: null,
//   acquirer_id: null,
//   authorization_code: null,
//   soft_descriptor: 'chocoanimato',
//   tid: null,
//   nsu: null,
//   date_created: '2021-02-22T14:09:40.974Z',
//   date_updated: '2021-02-22T14:09:40.974Z',
//   amount: 9000,
//   authorized_amount: 0,
//   paid_amount: 0,
//   refunded_amount: 0,
//   installments: 1,
//   id: 11422165,
//   cost: 0,
//   card_holder_name: 'Morpheus Fishburne',
//   card_last_digits: '1111',
//   card_first_digits: '411111',
//   card_brand: 'visa',
//   card_pin_mode: null,
//   card_magstripe_fallback: false,
//   cvm_pin: false,
//   postback_url: 'http://test',
//   payment_method: 'credit_card',
//   capture_method: 'ecommerce',
//   antifraud_score: null,
//   boleto_url: null,
//   boleto_barcode: null,
//   boleto_expiration_date: null,
//   referer: 'api_key',
//   ip: '186.220.199.133',
//   subscription_id: null,
//   phone: null,
//   address: null,
//   customer: {
//     object: 'customer',
//     id: 4757922,
//     external_id: '2fc7d410-89ad-4abb-bc34-10ae98414929',
//     type: 'individual',
//     country: 'br',
//     document_number: null,
//     document_type: 'cpf',
//     name: 'Jose da Silva',
//     email: 'comprador@sandbox.pagseguro.com.br',
//     phone_numbers: [Array],
//     born_at: null,
//     birthday: null,
//     gender: null,
//     date_created: '2021-02-22T14:09:40.916Z',
//     documents: [Array]
//   },
//   billing: {
//     object: 'billing',
//     id: 2009012,
//     name: 'Jose da Silva',
//     address: [Object]
//   },
//   shipping: null,
//   items: [[Object]],
//   card: {
//     object: 'card',
//     id: 'card_cklgnpahy01rg0i9tq6nob40q',
//     date_created: '2021-02-22T14:09:40.967Z',
//     date_updated: '2021-02-22T14:09:40.967Z',
//     brand: 'visa',
//     holder_name: 'Morpheus Fishburne',
//     first_digits: '411111',
//     last_digits: '1111',
//     country: 'UNITED STATES',
//     fingerprint: 'cj5bw4cio00000j23jx5l60cq',
//     valid: null,
//     expiration_date: '0922'
//   },
//   split_rules: null,
//   metadata: {},
//   antifraud_metadata: {},
//   reference_key: null,
//   device: null,
//   local_transaction_id: null,
//   local_time: null,
//   fraud_covered: false,
//   fraud_reimbursed: null,
//   order_id: null,
//   risk_level: 'unknown',
//   receipt_url: null,
//   payment: null,
//   addition: null,
//   discount: null,
//   private_label: null,
//   pix_qr_code: null,
//   pix_expiration_date: null
// };

const OrderSuccess = ({ id }) => {
  const { checkout, clearCheckout } = useCheckout();

  const { isLoading, isError, error, data: order, isFetching } = useOrder(id);

  // Clear Checkout from Context:
  useEffect(() => {
    clearCheckout();
  }, []);

  const SuccessComponent = () => {
    const { payment_method, project_ids } = order;

    // Get payment method:
    const paymentMethod = () => {
      switch (payment_method) {
        case 'CREDIT_CARD':
          return 'Cartão de Crédito';
        case 'BOLETO':
          return 'Boleto';
        case 'PIX':
          return 'PIX';
        default:
          return 'indisponível';
      }
    };

    const method = paymentMethod();

    // Multiple videos?
    const isMultipleVideos = project_ids.length > 1 ? true : false;

    return (
      <>
        <IconContainer>
          <IoMdCheckmarkCircleOutline size={62} />
        </IconContainer>
        <h2>Seu pedido foi enviado com sucesso!</h2>
        <p>
          O pedido será disponibilizado para download assim que o pagamento for
          confirmado e
          {isMultipleVideos ? ' os vídeo processados.' : ' o vídeo processado.'}
        </p>
        <p>Você optou pelo pagamento via {method}.</p>
        <hr />
        <OrderCard order={order} />
      </>
    );
  };

  return (
    <Layout>
      <Container>
        <Content>
          {order && <SuccessComponent />}
          {isLoading && <p>Carregando dados do Pedido...</p>}
          {isError && <p>Erro ao carregar dados do Pedido...</p>}
        </Content>
        <Button primary width="100%">
          Criar um vídeo novo
        </Button>
      </Container>
    </Layout>
  );
};

export default withAuth(OrderSuccess);

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
  async (context, user) => {
    const id = String(context.params.id);
    return {
      props: { id } // will be passed to the page component as props
    };
  }
);
