import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 450px; */
  justify-self: center;

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }

  em {
    cursor: pointer;
    padding: 1rem;
  }

  a {
    align-items: center;
  }
`;

export const Content = styled.div`
  p {
    margin-bottom: 4px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: right;

  svg {
    fill: var(--secondary);
  }

  a {
    cursor: pointer;
  }
`;

export const OrderItemContainer = styled.div``;

export const FormContainer = styled.div`
  p {
    margin-bottom: 4px;
  }
`;

export const FieldGroupContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  /* max-width: 450px; */
`;

export const FieldGroupPaymentContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
  padding: 1rem;
  /* max-width: 450px; */
`;

export const EmptyCheckoutContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  p {
    margin: 1rem;
  }
`;
