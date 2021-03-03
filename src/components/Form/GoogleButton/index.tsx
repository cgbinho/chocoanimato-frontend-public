import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const GoogleButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      <img src="./images/google.svg" alt="Google" />
      {children}
    </Container>
  );
};

export default GoogleButton;
