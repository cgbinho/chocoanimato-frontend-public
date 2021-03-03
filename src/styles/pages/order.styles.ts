import styled, { css } from 'styled-components';
import { shade, cssVar } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-self: flex-start;
  max-width: 500px;
  min-width: 350px;

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }
`;

export const OrderCardContainer = styled.div`
  display: grid;
  grid-auto-flow: row;

  h1,
  h2,
  h3 {
    text-align: center;
    margin-top: 1rem;
  }
`;

export const OrderItemContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 0.75rem;
`;
