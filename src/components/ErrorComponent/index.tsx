import React from 'react';
import { ErrorContainer } from './styles';
import { BiError } from 'react-icons/bi';

interface IProps {
  message: string;
  hasIcon: boolean;
}

const Error = ({ message, hasIcon }: IProps) => {
  return (
    <ErrorContainer>
      {hasIcon && <BiError size={42} />}
      <p>{message}</p>
    </ErrorContainer>
  );
};
export default Error;
