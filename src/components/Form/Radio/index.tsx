import { Container, Content } from './styles';

type IRadioProps = {
  name: string;
  label: string;
  value: string;
  register: any;
  error?: any;
  errors?: any;
  defaultChecked?: boolean;
};

const Radio = ({
  name,
  label,
  value,
  defaultChecked = false,
  register,
  errors = null,
  error
}: IRadioProps) => {
  return (
    <Container>
      <Content>
        <input
          name={name}
          id={name}
          type="radio"
          value={value}
          ref={register}
          defaultChecked={defaultChecked}
        />
        <label htmlFor={value}>{label}</label>
      </Content>
      {error && <p>{error.message}</p>}
      {errors && errors[name] && <p>{errors[name]?.message}</p>}
    </Container>
  );
};

export default Radio;
