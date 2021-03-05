import React from 'react';
import { Container } from './styles';
import { BsCheckCircle } from 'react-icons/bs';

interface IProps {
  message: string;
  hasIcon: boolean;
}

const Success = ({ message, hasIcon }: IProps) => {
  return (
    <Container>
      {hasIcon && <BsCheckCircle size={42} />}
      <p>{message}</p>
    </Container>
  );
};
export default Success;
