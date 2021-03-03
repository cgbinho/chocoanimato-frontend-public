import { Container } from './styles';

type ISelectProps = {
  name: string;
  label: string;
  list: IListProps[];
  register: any;
  errors: any;
  error: any;
};

type IListProps = {
  name: string;
  value: string | number;
};

const Select: React.FC<ISelectProps> = ({
  name,
  list,
  label,
  register,
  errors,
  error
}: ISelectProps) => {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} ref={register}>
        {list.map(listItem => (
          <option value={listItem.value} key={listItem.name}>
            {listItem.name}
          </option>
        ))}
      </select>
      {error && <p>{error.message}</p>}
      {errors && errors[name] && <p>{errors[name]?.message}</p>}
    </Container>
  );
};

export default Select;
