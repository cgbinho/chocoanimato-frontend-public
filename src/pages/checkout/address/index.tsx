import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { withAuth } from '../../../components/WithAuth';
import { withAuthServerSideProps } from '../../../hoc/withAuthServerSide';
import { useForm } from 'react-hook-form';

import Button from '../../../components/Form/Button';
import { BiText } from 'react-icons/bi';

import Layout from '../../../components/Layout';

import MultiStep from '../../../components/Form/Multistep';
import Modal from '../../../components/Modal';
import ModalHeader from '../../../components/Modal/Header';
import Input from '../../../components/Form/Input';

import { Container } from '../../../styles/pages/checkout.address.styles';
import {
  PaymentModeContainer,
  FormContainer
} from '../../../styles/pages/checkout.billing.styles';
import { useCheckout } from '../../../hooks/checkout';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkoutAddressSchema } from '../../../schemas';
import SelectInput from '../../../components/Form/SelectInput';

import {
  BrazillianStates,
  CheckoutSteps as steps
} from '../../../constants/checkout';
import { cepMask, cpfMask } from '../../../validations/fieldMasks';
import {
  cepSanitization,
  CpfSanitization
} from '../../../validations/inputSanitization';
import useDebounce from '../../../hooks/utils/debounce';
import { useCep } from '../../../queries/cep';
import InputCep from '../../../components/Form/InputCep';
import { FieldGroupContainer } from '../../../styles/pages/checkout.styles';
import appConfig from '../../../config/app';

type IFormInputs = {
  address: {
    postal_code: string;
    street: string;
    locality: string;
    number: string;
    city: string;
    region_code: string;
  };
};

const defaultValues =
  appConfig.node_env === 'development'
    ? {
        address: {
          postal_code: '01452002',
          street: 'Avenida Brigadeiro Faria Lima',
          number: '1384',
          locality: 'Pinheiros',
          city: 'São Paulo',
          region_code: 'sp'
        }
      }
    : null;

const Form: React.FC = () => {
  const { isLoading, checkout, addPayerAddress } = useCheckout();
  const router = useRouter();

  const { register, setValue, handleSubmit, errors, control } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(checkoutAddressSchema),
    defaultValues
  });

  // CEP:
  const [cepCode, setCepCode] = useState('');
  const debouncedCepCode = useDebounce(cepCode, 800);
  const { data: cepData, error, isFetching } = useCep(debouncedCepCode);

  // if cep code is fetched, update formData:
  useEffect(() => {
    if (cepData) {
      setCepValues(cepData);
    }
  }, [cepData]);

  // Add CEP values to FormData
  const setCepValues = ({ street, neighborhood, city, state }) => {
    setValue('address.street', street);
    setValue('address.locality', neighborhood);
    setValue('address.city', city);
    setValue('address.region_code', state);
  };

  // Remove CEP values from FormData
  const setValuesToNull = () => {
    setValue('address.postal_code', null);
    setValue('address.street', null);
    setValue('address.locality', null);
    setValue('address.city', null);
    setValue('address.region_code', null);
  };

  // onChange trigger setCepCode() to fetch cep information and cep mask ( ui aestetics):
  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCepCode(cepSanitization(event.target.value));
    cepMask(event);
  };

  // Remove cep values:
  const handleRemoveCep = () => {
    // setCepCode to null:
    setCepCode('');
    // set Form values to null:
    setValuesToNull();
  };

  const onSubmit = handleSubmit(address => {
    // add to checkout context:
    addPayerAddress(address);
    // redirect:
    router.push('/checkout/billing');
  });

  return (
    <FormContainer>
      <form onSubmit={onSubmit} method="post">
        <PaymentModeContainer>
          <InputCep
            name="address.postal_code"
            register={register}
            errors={errors}
            handleRemoveCep={handleRemoveCep}
            handleCepChange={handleCepChange}
            isFetching={isFetching}
            error={error}
            data={cepData}
          />
          <Input
            name="address.street"
            label="Logradouro"
            type="text"
            placeholder="Nome da rua, avenida, etc."
            icon={BiText}
            register={register}
            error={errors?.address?.street}
          />
          <FieldGroupContainer>
            <Input
              name="address.number"
              label="Número | Complemento"
              type="text"
              placeholder="0000"
              icon={BiText}
              register={register}
              error={errors?.address?.number}
            />
            <Input
              name="address.locality"
              label="Bairro"
              type="text"
              placeholder="Nome do Bairro"
              icon={BiText}
              register={register}
              error={errors?.address?.locality}
            />
          </FieldGroupContainer>
          <FieldGroupContainer>
            <Input
              name="address.city"
              label="Cidade"
              type="text"
              placeholder="Nome da Cidade"
              icon={BiText}
              register={register}
              error={errors?.address?.city}
            />
            <SelectInput
              name="address.region_code"
              label="Estado"
              list={BrazillianStates}
              register={register}
              errors={errors}
              error={errors?.address?.region_code}
            />
          </FieldGroupContainer>
        </PaymentModeContainer>
        <pre>{JSON.stringify(checkout, null, 2)}</pre>
        <Button type="submit" primary isLoading={isLoading}>
          Avançar
        </Button>
      </form>
    </FormContainer>
  );
};

const CheckoutAddress: React.FC = () => {
  // this is the current order status step:
  const currentStep = { id: 2, name: 'Endereço' };

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Meu Pedido" />
          <MultiStep currentStep={currentStep} steps={steps} />
          <hr />
          <Form />
        </Container>
      </Modal>
    </Layout>
  );
};

export default withAuth(CheckoutAddress);
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
