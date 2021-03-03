import React from 'react';
import { BiError } from 'react-icons/bi';
import { ErrorContainer } from './styles';

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
