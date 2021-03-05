import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';
import { UseFormMethods, SubmitHandler, useForm } from 'react-hook-form';
import { SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si';
import { FaCcDinersClub, FaCcDiscover } from 'react-icons/fa';
import { BiCreditCard } from 'react-icons/bi';

const CardBand = ({ cardBrand }) => {
  const size = 40;
  return (
    <Container>
      {/* <label htmlFor="CardBrandField">Bandeira</label> */}
      <IconContainer cardBrand={cardBrand} size={size} />
      <em>{cardBrand?.card?.niceType ? cardBrand.card.niceType : ''}</em>

      {/* {cardBrand.card.niceType} */}
    </Container>
  );
};

export default CardBand;

const IconContainer = ({ cardBrand, size }) => {
  switch (cardBrand.card.type) {
    case 'visa':
      return <SiVisa size={size} />;
    case 'mastercard':
      return <SiMastercard size={size} />;
    case 'american-express':
      return <SiAmericanexpress size={size} />;
    case 'discover':
      return <FaCcDiscover size={size} />;
    case 'nomeDoCartão':
      return <BiCreditCard size={size} />;
    default:
      return <BiCreditCard size={size} />;
  }
};
