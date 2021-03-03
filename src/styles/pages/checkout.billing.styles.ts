import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-self: flex-start;
  max-width: 540px;

  .cardNumberContainer {
    display: grid;
    grid-template-columns: 1fr 0.3fr;
    gap: 1rem;
    max-width: 450px;
    /* grid-auto-flow: row; */
    /* grid-template-rows: 1fr 0.3fr; */
  }

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }
`;

export const PaymentModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
`;

export const FormContainer = styled.div`
  /* display: flex; */

  select {
    margin-top: 8px;
  }

  p {
    margin-bottom: 4px;
  }
`;
