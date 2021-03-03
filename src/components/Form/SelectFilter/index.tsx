import { FilterSelectContainer } from '../SelectInput/styles';

type ISelectProps = {
  name: string;
  list: IListProps[];
  register: any;
  errors: any;
  onChange?: () => void;
};

type IListProps = {
  name: string;
  value: string | number;
};

const Select: React.FC<ISelectProps> = ({
  name,
  list,
  register,
  errors,
  onChange
}: ISelectProps) => {
  return (
    <FilterSelectContainer>
      <select name={name} ref={register} onChange={onChange}>
        {list.map(listItem => (
          <option value={listItem.value} key={listItem.name}>
            {listItem.name}
          </option>
        ))}
      </select>
      {errors[name] && <p>{errors[name]?.message}</p>}
    </FilterSelectContainer>
  );
};

export default Select;
