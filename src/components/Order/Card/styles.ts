import styled, { css } from 'styled-components';
import { shade, cssVar } from 'polished';

export const OrderCardContainer = styled.div`
  display: grid;
  grid-auto-flow: row;

  h1,
  h2,
  h3 {
    text-align: center;
    margin-top: 1rem;
  }

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
    width: 100%;
  }
`;

export const OrderItemContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 0.75rem;
`;
