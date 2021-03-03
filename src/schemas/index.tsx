import cardValidation from 'card-validator';
import * as yup from 'yup';
import { lazy } from 'yup';

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, `O campo 'Email' precisa de no mínimo 3 caracteres.`)
    .max(255, `O campo 'Email' tem um limite de até 255 caracteres.`)
    .email(`O campo 'Email' precisa ser preenchido com um email.`)
    .required(`O campo 'Email' é obrigatório.`),
  password: yup
    .string()
    .required(`O campo 'Password' é obrigatório.`)
    .min(8, `O campo 'Password' precisa de no mínimo 8 caracteres.`)
    .max(25, `O campo 'Password' tem um limite de até 25 caracteres.`)
});

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, `O campo 'Nome' precisa de no mínimo 3 caracteres.`)
    .max(255, `O campo 'Nome' tem um limite de até 255 caracteres.`)
    .required(`O campo 'Nome' é obrigatório.`),
  email: yup
    .string()
    .min(3, `O campo 'Email' precisa de no mínimo 3 caracteres.`)
    .max(255, `O campo 'Email' tem um limite de até 255 caracteres.`)
    .email(`O campo 'Email' precisa ser preenchido com um email.`)
    .required(`O campo 'Email' é obrigatório.`),
  password: yup
    .string()
    .required(`O campo 'Senha' é obrigatório.`)
    .min(8, `O campo 'Senha' precisa de no mínimo 8 caracteres.`)
    .max(25, `O campo 'Senha' tem um limite de até 25 caracteres.`),
  password_confirmation: yup
    .string()
    .required(`O campo 'Senha' é obrigatório.`)
    .oneOf(
      [yup.ref('password'), null],
      'Confirmação da senha falhou, digite novamente.'
    ),
  terms: yup
    .boolean()
    .oneOf(
      [true],
      'Você precisa concordar com os termos para poder se cadastrar.'
    )
  // .required('Você precisa concordar com os termos para poder se cadastrar.')
  // .required(`Você precisa concordar com os termos para poder se cadastrar.`)
});

export const updateProfileSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, `O campo 'Nome' precisa de no mínimo 3 caracteres.`)
    .max(255, `O campo 'Nome' tem um limite de até 255 caracteres.`)
    .required(`O campo 'Nome' é obrigatório.`),
  email: yup
    .string()
    .min(3, `O campo 'Email' precisa de no mínimo 3 caracteres.`)
    .max(255, `O campo 'Email' tem um limite de até 255 caracteres.`)
    .email(`O campo 'Email' precisa ser preenchido com um email.`)
    .required(`O campo 'Email' é obrigatório.`),
  old_password: yup.string(),
  password: yup.string().when('old_password', {
    is: val => !!val.length,
    then: yup.string().required('Campo obrigatório'),
    otherwise: yup.string()
  }),
  password_confirmation: yup.string().when('old_password', {
    is: val => !!val.length,
    then: yup.string().required('Campo obrigatório'),
    otherwise: yup.string()
  })
});

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, `O campo 'Nome' precisa de no mínimo 3 caracteres.`)
    .max(255, `O campo 'Nome' tem um limite de até 255 caracteres.`)
    .required(`O campo 'Nome' é obrigatório.`),
  email: yup
    .string()
    .min(3, `O campo 'Email' precisa de no mínimo 3 caracteres.`)
    .max(255, `O campo 'Email' tem um limite de até 255 caracteres.`)
    .email(`O campo 'Email' precisa ser preenchido com um email.`)
    .required(`O campo 'Email' é obrigatório.`),
  message: yup
    .string()
    .required(`O campo 'Mensagem' é obrigatório.`)
    .min(8, `O campo 'Mensagem' precisa de no mínimo 8 caracteres.`)
    .max(255, `O campo 'Mensagem' tem um limite de até 255 caracteres.`)
});

export const checkoutPersonalSchema = yup.object().shape({
  payer: yup.object().shape({
    name: yup
      .string()
      .min(3, `O campo 'Nome' precisa de no mínimo 3 caracteres.`)
      .max(255, `O campo 'Nome' tem um limite de até 255 caracteres.`)
      .required(`O campo 'Nome' é obrigatório.`),
    tax_id: yup
      .string()
      .required(`O campo 'CPF' é obrigatório.`)
      .min(14, `O campo 'CPF' precisa de no mínimo 11 caracteres.`)
      .max(14, `O campo 'CPF' tem um limite de até 11 caracteres.`),
    // .test('CPF not valid', `O número não é um CPF válido`, function (value) {
    //   return CpfValidation(value);
    // }),
    email: yup
      .string()
      .min(3, `O campo 'Email' precisa de no mínimo 3 caracteres.`)
      .max(255, `O campo 'Email' tem um limite de até 255 caracteres.`)
      .email(`O campo 'Email' precisa ser preenchido com um email.`)
      .required(`O campo 'Email' é obrigatório.`)
  })
});

export const checkoutAddressSchema = yup.object().shape({
  address: yup.object().shape({
    postal_code: yup
      .string()
      .max(9, `O campo 'CEP' tem um limite de até 8 caracteres.`)
      .required(`O campo 'CEP' é obrigatório.`),
    street: yup.string().required(`O campo 'Logradouro' é obrigatório.`),
    locality: yup.string().required(`O campo 'Bairro' é obrigatório.`),
    number: yup.string().required(`O campo 'Número' é obrigatório.`),
    city: yup.string().required(`O campo 'Cidade' é obrigatório.`),
    region_code: yup.string().required(`O campo 'Estado' é obrigatório.`)
  })
});

export const checkoutBillingSchema = lazy(({ payment }) => {
  return payment.payment_method === 'CREDIT_CARD'
    ? checkoutBillingCreditCardSchema
    : checkoutBillingBoletoSchema;
});

const checkoutBillingBoletoSchema = yup.object().shape({
  payment: yup.object().shape({
    payment_method: yup
      .string()
      .required(`O campo 'Método de Pagamento' é obrigatório.`)
  })
});

const checkoutBillingCreditCardSchema = yup.object().shape({
  payment: yup.object().shape({
    payment_method: yup
      .string()
      .required(`O campo 'Método de Pagamento' é obrigatório.`),
    // installments: yup.string().required(`O campo 'Parcelas' é obrigatório.`),
    card: yup.object().shape({
      number: yup
        .string()
        .required(`O campo 'Número do Cartão' é obrigatório.`)
        .max(
          19,
          `O campo 'Número do Cartão' tem um limite de até 16 caracteres.`
        )
        .test('card_number not valid', `Número de cartão inválido`, function (
          value
        ): boolean {
          const numberValidation = cardValidation.number(value);
          return numberValidation.isValid;
        }),
      expiration_date: yup
        .string()
        .required(`O campo 'Data de Expiração' é obrigatório.`)
        .test(
          'Expiration_date not valid',
          `Data de expiração inválida`,
          function (value): boolean {
            const dateValidation = cardValidation.expirationDate(value);
            return dateValidation.isValid;
          }
        ),
      security_code: yup
        .string()
        // .integer(`O código precisa ser uma sequência numérica`)
        .min(3, `O campo 'CVV' precisa ter no mínimo 3 caracteres.`)
        .max(4, `O campo 'CVV' tem um limite de até 4 caracteres.`)
        .required(`O campo 'CVV' é obrigatório.`),
      card_holder_name: yup
        .string()
        .min(
          3,
          `O campo 'Nome do Portador do cartão' precisa ser igual ao nome que consta no cartão.`
        )
        .max(
          255,
          `O campo 'Nome do Portador do cartão' tem um limite de até 255 caracteres.`
        )
        .required(`O campo 'Nome do Portador do cartão' é obrigatório.`)
    })
  })
});

// const paymentMethod = (method) => {

// }
