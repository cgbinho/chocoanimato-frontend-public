import { BiBarcode } from 'react-icons/bi';
import { FiCalendar, FiFlag } from 'react-icons/fi';
import { OrderProps } from '../../../types';

import { formatCreateDate } from '../../../services/formatTime';

import OrderBoletoInfo from '../../Order/BoletoInfo';

import { Container } from './styles';

const OrderInfo = ({ order }) => {
  console.log(order);
  const { id, transaction_id, payment_method } = order;

  const updated_at = formatCreateDate(order.updated_at);
  const created_at = formatCreateDate(order.created_at);

  return (
    <Container status={order.status}>
      <section>
        <BiBarcode size="18px" />
        <span>Cód. do Pedido: {transaction_id}.</span>
      </section>
      <section>
        <FiCalendar size="18px" />
        <span>Realizado em {created_at}.</span>
      </section>
      <section>
        <FiFlag size="18px" />
        <span>
          Status do Pedido: <em>{order.status.pt}</em>.
        </span>
      </section>
      <section>
        <FiCalendar size="18px" />
        <span>Pedido atualizado em {updated_at}.</span>
        <span></span>
      </section>
    </Container>
  );
};

export default OrderInfo;
