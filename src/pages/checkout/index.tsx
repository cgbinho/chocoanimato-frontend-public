import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Form/Button';
import { IoIosClose, IoIosSearch } from 'react-icons/io';

import Layout from '../../components/Layout';

import Modal from '../../components/Modal';
import ModalHeader from '../../components/Modal/Header';
import OrderTitle from '../../components/Order/Title';
import Price from '../../components/Order/Price';
import OrderTotals from '../../components/Order/Totals';
import Tags from '../../components/Template/Tags';
import { useCheckout } from '../../hooks/checkout';
import { useCoupon } from '../../queries/coupon';
import useDebounce from '../../hooks/utils/debounce';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useRouter } from 'next/router';
import {
  Container,
  EmptyCheckoutContainer,
  IconContainer,
  OrderItemContainer
} from '../../styles/pages/checkout.styles';
import { withAuthServerSideProps } from '../../hoc/withAuthServerSide';
import { withAuth } from '../../components/WithAuth';
import Coupon from '../../components/Checkout/Coupon';

type FormValues = {
  payment: {
    coupon_code: string;
  };
};

const Checkout = () => {
  const {
    checkout,
    removeItemFromCheckout,
    addCoupon,
    removeCoupon
  } = useCheckout();

  const router = useRouter();

  const { coupon, payment, items } = checkout;

  const total = payment?.total ? payment.total : 0;
  const subtotal = payment?.subtotal ? payment.subtotal : 0;

  // Check if there are items.
  const hasItems = !!items?.[0];
  // Checkout form handling:
  const { register, setValue, handleSubmit, errors } = useForm<FormValues>({
    defaultValues: {
      payment: { coupon_code: coupon?.code }
    }
  });

  // Remove item from checkout
  const handleRemoveItem = (id: string) => {
    removeItemFromCheckout(id);
  };

  // toggle Coupon
  const [isCouponOpen, setCouponOpen] = useState(false);

  const toggleCouponOpen = () => {
    setCouponOpen(!isCouponOpen);
  };
  // Coupon code input state:
  const [code, setCode] = useState();
  const debouncedCode = useDebounce(code, 1000);
  // Fetching coupon data:
  const { data, error, isFetching } = useCoupon(debouncedCode);

  // if coupon is fetched, update context:
  useEffect(() => {
    if (code) {
      addCoupon(data);
    }
  }, [data]);

  // Remove coupon from state, context and input:
  const handleRemoveCoupon = () => {
    setValue('payment.coupon_code', undefined);
    setCode(undefined);
    removeCoupon();
  };

  // updates the coupon code input via 'setCode', causing react-query to fetch with debounce.
  const handleOnChange = e => {
    setValue('payment.coupon_code', e.target.value.toUpperCase());
    setCode(e.target.value.toUpperCase());
    if (e.target.value.toUpperCase() === '') {
      removeCoupon();
    }
  };

  // Start the order routine.
  const handleCheckout: SubmitHandler<FormValues> = data => {
    router.push('/checkout/personal');
  };

  // No Checkout Items, return empty.
  if (!hasItems) {
    return <EmptyCheckout />;
  }

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Carrinho" />
          <hr />
          <OrderItemsList items={items} handleRemoveItem={handleRemoveItem} />
          <form onSubmit={handleSubmit(handleCheckout)} method="post">
            {isCouponOpen ? (
              <>
                <a onClick={toggleCouponOpen}>
                  <em>- Cupom de desconto</em>
                </a>
                <Coupon
                  register={register}
                  errors={errors}
                  handleRemoveCoupon={handleRemoveCoupon}
                  handleOnChange={handleOnChange}
                  isFetching={isFetching}
                  error={error}
                  data={data}
                />
              </>
            ) : (
              <>
                <a onClick={toggleCouponOpen}>
                  <em>+ Cupom de desconto</em>
                </a>
              </>
            )}
            <OrderTotals total={total} subtotal={subtotal} />
            <Button primary type="submit" disabled={!hasItems}>
              Fazer o pedido
            </Button>
          </form>
        </Container>
      </Modal>
    </Layout>
  );
};

const EmptyCheckout = () => {
  const router = useRouter();

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Carrinho vazio" />
          <hr />
          <EmptyCheckoutContainer>
            <HiOutlineShoppingCart size={40} />
            <p>Nenhum item no carrinho.</p>
            <Button primary onClick={() => router.push('/projects')}>
              Meus Projetos
            </Button>
          </EmptyCheckoutContainer>
        </Container>
      </Modal>
    </Layout>
  );
};

const OrderItemsList = ({ items, handleRemoveItem }) => {
  return (
    <>
      {items.map(item => (
        <OrderItem
          item={item}
          key={item.id}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </>
  );
};

const OrderItem = ({ item, handleRemoveItem }) => {
  const {
    id,
    name,
    template: { description, price, ratio, duration, category }
  } = item;

  return (
    <OrderItemContainer>
      <IconContainer>
        <a onClick={() => handleRemoveItem(item.id)}>
          <IoIosClose size={28} />
        </a>
      </IconContainer>
      <OrderTitle name={name} description={description} />
      <Tags margin="1rem 0" tags={{ category, ratio, duration }} />
      <Price price={price} justify="right" />
      <hr />
    </OrderItemContainer>
  );
};

export default withAuth(Checkout);
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
