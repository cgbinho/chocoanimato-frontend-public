import { InputHTMLAttributes } from 'react';
import { Container, Content } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  register: any;
  errors?: any;
  onChange?(): void;
}

const Checkbox: React.FC<InputProps> = ({
  children,
  checked,
  onChange,
  ...rest
}) => {
  const { name, type, register, errors } = rest;
  return (
    <Container>
      <Content>
        <input name={name} type="checkbox" ref={register} onChange={onChange} />
        <span />
        {children}
      </Content>
      {errors[name] && <p>{errors[name]?.message}</p>}
    </Container>
  );
};
export default Checkbox;
