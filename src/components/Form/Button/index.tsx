import React, { ButtonHTMLAttributes } from 'react';
import { Container, SpinnerContainer } from './styles';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: string;
  primary?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

const Button = ({
  children,
  primary,
  width = '100%',
  disabled,
  isLoading = false,
  className,
  ...rest
}: IButtonProps) => {
  return (
    <Container
      type="button"
      primary={primary}
      width={width}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {!isLoading ? children : <SpinnerContainer></SpinnerContainer>}
      {/* {children}
      {isLoading && <SpinnerContainer></SpinnerContainer>} */}
    </Container>
  );
};

export default Button;
