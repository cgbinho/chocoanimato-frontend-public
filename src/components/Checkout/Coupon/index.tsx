import React from 'react';
import { BiCheckCircle, BiPurchaseTag } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import { IconContainer } from '../../../styles/pages/checkout.styles';
import { SpinnerContainer } from '../../Form/Button/styles';
import Input from '../../Form/Input';
import { CouponContainer } from './styles';

export type ContainerProps = {
  code: string;
};

const Coupon = ({
  register,
  errors,
  isFetching,
  error,
  handleOnChange,
  handleRemoveCoupon,
  data
}) => {
  return (
    <CouponContainer>
      <section>
        <p>Coupon</p>
        {isFetching && (
          <div className="ok">
            <SpinnerContainer />
          </div>
        )}
        {data?.code && (
          <div className="ok">
            <BiCheckCircle size={26} />
          </div>
        )}
        <Input
          name="payment.coupon_code"
          type="text"
          register={register}
          placeholder="0000"
          errors={errors}
          icon={BiPurchaseTag}
          onChange={handleOnChange}
        />
        <IconContainer>
          <a onClick={handleRemoveCoupon}>
            <IoIosClose size={28} />
          </a>
        </IconContainer>
      </section>
      <div className="error">
        {error && !isFetching && <p>Cupom inválido / expirado.</p>}
      </div>
    </CouponContainer>
  );
};

export default Coupon;
