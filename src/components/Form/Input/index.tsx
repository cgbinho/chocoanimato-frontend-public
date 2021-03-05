import { InputHTMLAttributes } from 'react';
import { Container, Content, InputContainer } from './styles';
import { IconBaseProps } from 'react-icons';
import { UseFormMethods, SubmitHandler, useForm } from 'react-hook-form';
import Tooltip from '../../Tooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  icon: React.ComponentType<IconBaseProps>;
  register?: any;
  label?: string;
  tooltip?: string;
  errors?: any;
  error?: any;
}

const Input: React.FC<InputProps> = props => {
  const {
    name,
    type,
    register,
    label,
    placeholder,
    tooltip,
    errors = null,
    error,
    icon: Icon,
    onChange
  } = props;

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <Content>
        <InputContainer>
          {Icon && <Icon size={20} />}
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            ref={register}
            onChange={onChange}
          />
        </InputContainer>
        {tooltip && <Tooltip message={tooltip} />}
      </Content>
      {error && <p>{error.message}</p>}
      {errors && errors[name] && <p>{errors[name]?.message}</p>}
    </Container>
  );
};

export default Input;
