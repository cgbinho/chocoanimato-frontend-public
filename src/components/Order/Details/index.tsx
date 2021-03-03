import { BiBarcode } from 'react-icons/bi';
import OrderBoletoInfo from '../../Order/BoletoInfo';
import { Container } from './styles';

const OrderDetails = ({ order }) => {
  const isBoleto = order.payment_method === 'BOLETO' ? true : false;
  const paymentMethod =
    order.payment_method === 'BOLETO' ? 'Boleto' : 'Cartão de crédito';
  const isAwaitingPayment =
    order.status.pt === 'Aguardando Pagamento' ? true : false;

  return (
    <Container status={order.status}>
      <section>
        <BiBarcode size="18px" />
        <span>Método de Pagamento: {paymentMethod}.</span>
      </section>
      <section>
        {isBoleto && isAwaitingPayment && <OrderBoletoInfo order={order} />}
      </section>
    </Container>
  );
};

export default OrderDetails;
