import React from 'react';
import { OrderDataContainer } from '../../../../styles/pages/checkout.confirm.styles';
import ErrorComponent from '../../../ErrorComponent';
import Button from '../../../Form/Button';
import OrderTitle from '../../../Order/Title';
import OrderTotals from '../../../Order/Totals';
import TemplateTags from '../../../Template/Tags';
import Price from '../../Price';

export const OrderData = ({
  checkout,
  handleSubmitOrder,
  isLoading,
  isError
}) => {
  const {
    items,
    payer,
    payment: { total, subtotal },
    coupon
  } = checkout;
  // const address = checkout.payer?.address;
  // const { isLoading, isError } = useCheckout();

  return (
    <OrderDataContainer>
      <h3>Resumo do Pedido</h3>
      {/* ORDER ITEMS: */}
      {items.map(item => (
        <OrderItem item={item} key={item.id} />
      ))}
      {/* TOTALS */}
      <div className="footer">
        <OrderTotals total={total} subtotal={subtotal} />
        <Button primary onClick={handleSubmitOrder} isLoading={isLoading}>
          Confirmar Pedido
        </Button>
        {isError && (
          <ErrorComponent
            hasIcon={false}
            message={'Ocorreu um erro ao enviar o seu pedido, tente novamente.'}
          />
        )}
      </div>
    </OrderDataContainer>
  );
};

const OrderItem = ({ item }) => {
  const { category, ratio, duration, price, description } = item.template;
  const { name, id } = item;

  return (
    <>
      <hr />
      <OrderTitle name={name} description={description} />
      <TemplateTags margin="0.75rem 0" tags={{ category, ratio, duration }} />
      <Price price={price} justify="end" />
    </>
  );
};
