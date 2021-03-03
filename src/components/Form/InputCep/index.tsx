import React from 'react';
import { AiOutlineNumber } from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import { FieldGroupContainer } from '../../../styles/pages/checkout.styles';
import { SpinnerContainer } from '../../Form/Button/styles';
import Input from '../../Form/Input';
import { Container } from './styles';

export type ContainerProps = {
  cepCode: string;
};

const InputCep = ({
  register,
  isFetching,
  errors,
  error,
  name,
  handleCepChange,
  handleRemoveCep,
  data
}) => {
  return (
    <Container>
      <FieldGroupContainer>
        <Input
          name={name}
          label="CEP"
          type="tel"
          placeholder="00000-000"
          icon={AiOutlineNumber}
          register={register}
          error={errors?.payer?.address?.postal_code}
          onChange={handleCepChange}
        />
        {/* {data ? JSON.stringify(data, null, 2) : 'sem data'} */}
        <aside className="status">
          {/* {data?.cep} */}
          {isFetching && <SpinnerContainer />}
          {data?.cep && <BiCheckCircle size={26} />}
          <a className="close" onClick={handleRemoveCep}>
            <IoIosClose size={28} />
          </a>
        </aside>
      </FieldGroupContainer>
      <div className="error">
        {error && !isFetching && <p>Cep inválido.</p>}
      </div>
    </Container>
  );
};

export default InputCep;
