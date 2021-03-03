import styled from 'styled-components';
import { shade, cssVar } from 'polished';

export const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: flex-start; */
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: min-content 1fr;
  margin: 1.5rem;
`;

export const OrderContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  margin-bottom: 1rem;

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }
`;
