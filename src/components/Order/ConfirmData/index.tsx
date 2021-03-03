import Link from 'next/link';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { UserDataContainer } from '../../../styles/pages/checkout.confirm.styles';

export const UserData = ({ checkout }) => {
  const { payer, payment } = checkout;

  const address = checkout.payer?.address;
  const paymentMethodExists = checkout?.payment?.payment_method;

  const paymentMethod =
    checkout?.payment.payment_method === 'CREDIT_CARD'
      ? 'Cartão de crédito'
      : 'Boleto';

  return (
    <UserDataContainer>
      {/* <pre>{JSON.stringify(checkout, null, 2)}</pre> */}
      <section>
        <h3>Dados Pessoais</h3>
        <Link href="/checkout/personal">
          <a>
            <FiEdit size={18} />
          </a>
        </Link>
      </section>
      <p>Nome: {payer?.name}</p>
      <p>Email: {payer?.email}</p>
      <p>CPF: {payer?.tax_id}</p>

      {address && (
        <>
          <section>
            <h3>Endereço</h3>
            <Link href="/checkout/billing">
              <a>
                <FiEdit size={18} />
              </a>
            </Link>
          </section>
          <p>CEP: {address.postal_code}</p>
          <p>Logradouro: {address.street}</p>
          <p>Número | Complemento: {address.number}</p>
          <p>Bairro: {address.locality}</p>
          <p>Cidade: {address.city}</p>
          <p>Estado: {address.region}</p>
          <p>Código do Estado: {address.region_code}</p>
        </>
      )}
      <section>
        <h3>Pagamento</h3>
        <Link href="/checkout/billing">
          <a>
            <FiEdit size={18} />
          </a>
        </Link>
      </section>
      <p>Método: {paymentMethod}</p>
      {payment.payment_method === 'CREDIT_CARD' && (
        <>
          <p>Número: {payment.card.number}</p>
          <p>Data de Expiração: {payment.card.expiration_date}</p>
        </>
      )}
    </UserDataContainer>
  );
};
