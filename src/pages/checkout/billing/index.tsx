import { useForm } from 'react-hook-form';

import Button from '../../../components/Form/Button';
import { BiText } from 'react-icons/bi';
import { AiOutlineNumber } from 'react-icons/ai';
import { FiCalendar, FiFlag } from 'react-icons/fi';

import Layout from '../../../components/Layout';

import MultiStep from '../../../components/Form/Multistep';
import SelectInput from '../../../components/Form/SelectInput';
import Modal from '../../../components/Modal';
import ModalHeader from '../../../components/Modal/Header';
import {
  Container,
  PaymentModeContainer,
  FormContainer
} from '../../../styles/pages/checkout.billing.styles';
import { useCheckout } from '../../../hooks/checkout';
import { useRouter } from 'next/router';

import { checkoutBillingSchema } from '../../../schemas';

import {
  CheckoutSteps as steps,
  BrazillianStates
} from '../../../constants/checkout';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';

import {
  creditCardMask,
  monthYearMask,
  cvvMask,
  cepMask
} from '../../../validations/fieldMasks';

import useCardBrand from '../../../hooks/utils/useCardBrand';
import CardBrand from '../../../components/Form/CardBrand';
import useDebounce from '../../../hooks/utils/debounce';
import { useCep } from '../../../queries/cep';

import { formatPrice } from '../../../services/formatPrice';

import { withAuth } from '../../../components/WithAuth';
import { withAuthServerSideProps } from '../../../hoc/withAuthServerSide';
import appConfig from '../../../config/app';
import Radio from '../../../components/Form/Radio';
import Input from '../../../components/Form/Input';
import { GetServerSideProps } from 'next';
import {
  FieldGroupContainer,
  FieldGroupPaymentContainer
} from '../../../styles/pages/checkout.styles';

type IFormInputs = {
  payer?: {
    address: {
      postal_code: string;
      street: string;
      locality: string;
      number: string;
      city: string;
      region_code: string;
    };
  };
  payment: {
    payment_method: string;
    card?: {
      number: string;
      expiration_date: string;
      security_code: string;
      card_holder_name: string;
    };
  };
};

const defaultValues =
  appConfig.node_env === 'development'
    ? {
        payment: {
          payment_method: 'BOLETO', // 'CREDIT_CARD'
          card: {
            number: '4242 4242 4242 4242',
            expiration_date: '12/2030',
            security_code: '123',
            card_holder_name: 'Jose da Silva'
          }
        }
      }
    : null;

const CheckoutBilling = () => {
  // this is the current order status step:
  const currentStep = { id: 3, name: 'Modo de Pagamento' };

  const { checkout, addCreditCardBilling, addBoletoBilling } = useCheckout();
  const router = useRouter();

  // CARD:
  const [cardNumber, setCardNumber] = useState('');
  const cardBrand = useCardBrand(cardNumber);

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
    setValue('payer.address.street', street);
    setValue('payer.address.locality', neighborhood);
    setValue('payer.address.city', city);
    setValue('payer.address.region_code', state);
  };

  // Remove CEP values from FormData
  const setValuesToNull = () => {
    setValue('payer.address.postal_code', null);
    setValue('payer.address.street', null);
    setValue('payer.address.locality', null);
    setValue('payer.address.city', null);
    setValue('payer.address.region_code', null);
  };

  const { register, setValue, handleSubmit, errors, watch } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(checkoutBillingSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues
  });
  // Watch payment_method to show 'boleto' or 'credit card' inputs:
  const paymentMethod = watch('payment.payment_method');

  // On Submit add form data to checkout context:
  const onSubmit = handleSubmit(async ({ payer, payment }: IFormInputs) => {
    // add to Checkout context based on payment_method ( credit card or boleto):
    if (paymentMethod === 'CREDIT_CARD') {
      await addCreditCardBilling({ payer, payment });
    } else {
      addBoletoBilling({ payment });
    }
    // redirect user
    router.push('/checkout/confirm');
  });

  const Installments = () => {
    return [...new Array(4)].map((item, idx) => {
      const installment = idx + 1;
      return {
        name: `${installment}x = ${formatPrice(
          checkout.payment.total / installment
        )}`,
        value: installment
      };
    });
  };

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Meu Pedido" />
          <MultiStep currentStep={currentStep} steps={steps} />
          <hr />
          <FormContainer>
            <form onSubmit={onSubmit} method="post">
              <p>Modo de Pagamento</p>
              <FieldGroupPaymentContainer>
                <Radio
                  name="payment.payment_method"
                  label="Cartão de Crédito"
                  value="CREDIT_CARD"
                  register={register}
                  error={errors?.payment?.payment_method}
                />
                <Radio
                  name="payment.payment_method"
                  label="Boleto"
                  value="BOLETO"
                  register={register}
                  error={errors?.payment?.payment_method}
                />
                {errors?.payment?.payment_method}
              </FieldGroupPaymentContainer>
              {paymentMethod === 'CREDIT_CARD' && (
                <CreditCardForm
                  register={register}
                  errors={errors}
                  setCardNumber={setCardNumber}
                  cardBrand={cardBrand}
                  installments={Installments()}
                />
              )}
              <Button type="submit" primary>
                Avançar
              </Button>
              <pre>{JSON.stringify(checkout, null, 2)}</pre>
            </form>
          </FormContainer>
        </Container>
      </Modal>
    </Layout>
  );
};

/* CREDIT CARD */
const CreditCardForm = ({
  register,
  errors,
  setCardNumber,
  cardBrand,
  installments
}) => {
  return (
    <PaymentModeContainer>
      <div className="cardNumberContainer">
        <Input
          name="payment.card.number"
          label="Número do Cartão"
          type="text"
          placeholder="0000 0000 0000 0000"
          icon={AiOutlineNumber}
          register={register}
          error={errors?.payment?.card?.number}
          onChange={e => {
            setCardNumber(e.target.value);
            creditCardMask(e);
          }}
        />
        <CardBrand cardBrand={cardBrand} />
      </div>
      <Input
        name="payment.card.card_holder_name"
        label="Nome do portador do Cartão"
        type="text"
        placeholder="Seu nome"
        icon={BiText}
        tooltip="Insira o nome exatamente como está no cartão"
        register={register}
        error={errors?.payment?.card?.holder?.name}
      />
      <FieldGroupContainer>
        <Input
          name="payment.card.expiration_date"
          label="Data de Expiração"
          type="text"
          placeholder="MM/AA"
          tooltip={'Mês e Ano de expiração do cartão'}
          icon={FiCalendar}
          register={register}
          onChange={monthYearMask}
          error={errors?.payment?.card?.expiration_date}
        />
        <Input
          name="payment.card.security_code"
          label="CVV"
          type="text"
          placeholder="0000"
          tooltip={'Código de até 4 dígitos atrás do cartão'}
          icon={AiOutlineNumber}
          register={register}
          error={errors?.payment?.card?.security_code}
          onChange={cvvMask}
        />
      </FieldGroupContainer>
      <SelectInput
        name="payment.installments"
        label="Parcelas"
        list={installments}
        register={register}
        errors={errors}
        error={errors?.payment?.installments}
      />
    </PaymentModeContainer>
  );
};

export default withAuth(CheckoutBilling);
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
