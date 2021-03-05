import styled, { keyframes } from 'styled-components';
import { shade, cssVar } from 'polished';

export const ErrorContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  /* grid-gap: 8px; */
  font-size: 16px;
  p {
    text-align: center;
    margin-top: 16px;
    color: tomato;
  }
`;
