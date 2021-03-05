import { InputHTMLAttributes } from 'react';
import { Container, Content } from './styles';
import { CgColorPicker } from 'react-icons/cg';
import { UseFormMethods, SubmitHandler, useForm } from 'react-hook-form';
import SelectInput from '../SelectInput';
import Tooltip from '../../Tooltip';

type ISelectProps = {
  name: string;
  label: string;
  list: IListProps[];
  tooltip: string;
  register: any;
  errors: any;
};

type IListProps = {
  name: string;
  value: string | number;
};

const InputSound: React.FC<ISelectProps> = ({
  name,
  list,
  label,
  tooltip,
  register,
  errors
}: ISelectProps) => {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <Content>
        <select name={name} ref={register}>
          {list.map(listItem => (
            <option value={listItem.value} key={listItem.name}>
              {listItem.name}
            </option>
          ))}
        </select>
        {tooltip && <Tooltip message={tooltip} />}
      </Content>
      Play Pause Stop
      {errors[name] && <p>{errors[name]?.message}</p>}
    </Container>
  );
};

export default InputSound;
