import { useForm } from 'react-hook-form';
import SelectFilter from '../../../components/Form/SelectFilter';

import { FiltersContainer, FilterContainer } from './styles';

type IFormInputs = {
  category: string;
  duration: string;
  ratio: string;
  price: string;
};
type IListProps = {
  name: string;
  value: string | number;
};

type ISelectProps = {
  label: string;
  name: string;
  list: IListProps[];
  register: any;
  errors: any;
  onChange: () => void;
};

const Filter: React.FC<ISelectProps> = ({
  label,
  name,
  list,
  register,
  errors,
  onChange
}: ISelectProps) => {
  return (
    <FilterContainer>
      <label htmlFor={name}>{label}</label>
      <SelectFilter
        name={name}
        list={list}
        register={register}
        onChange={onChange}
        errors={errors}
      />
    </FilterContainer>
  );
};

const Filters = ({ setCategory, setDuration, setRatio, setSort }) => {
  const { register, setValue, handleSubmit, errors } = useForm<IFormInputs>({
    defaultValues: {
      category: 'todas',
      duration: '0',
      ratio: 'todas',
      price: 'ASC'
    }
  });

  const onSubmit = handleSubmit(
    ({ category, duration, ratio, price }: IFormInputs) => {
      setCategory(category);
      setDuration(duration);
      setRatio(ratio);
      setSort(price);
    }
  );

  const handleResetFilters = () => {
    setCategory('todas');
    setDuration('0');
    setRatio('todas');
    setSort('ASC');
  };

  return (
    <FiltersContainer>
      <form onSubmit={onSubmit} method="post">
        <Filter
          label={'Categoria'}
          name={'category'}
          list={[
            { name: 'Todas', value: 'todas' },
            { name: 'Video Explicativo', value: 'video-explicativo' },
            { name: 'Video Institucional', value: 'video-institucional' }
          ]}
          register={register}
          onChange={onSubmit}
          errors={errors}
        />
        <Filter
          label={'Duração'}
          name={'duration'}
          list={[
            { name: 'Todas', value: '0' },
            { name: 'Até 60 segundos', value: 60 },
            { name: 'Até 30 segundos', value: 30 }
          ]}
          onChange={onSubmit}
          register={register}
          errors={errors}
        />
        <Filter
          label={'Proporção'}
          name={'ratio'}
          list={[
            { name: 'Todas', value: 'todas' },
            { name: 'Modo Paisagem', value: 'paisagem' },
            { name: 'Modo Retrato', value: 'retrato' }
          ]}
          onChange={onSubmit}
          register={register}
          errors={errors}
        />
        <Filter
          label={'Preço'}
          name={'price'}
          list={[
            { name: 'Crescente', value: 'ASC' },
            { name: 'Decrescente', value: 'DESC' }
          ]}
          onChange={onSubmit}
          register={register}
          errors={errors}
        />
        <a onClick={handleResetFilters}>Remover filtros</a>
      </form>
    </FiltersContainer>
  );
};

export default Filters;
