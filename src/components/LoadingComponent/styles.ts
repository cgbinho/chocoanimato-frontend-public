import styled, { keyframes } from 'styled-components';

export const LoadingContainer = styled.div`
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
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid var(--secondary);
  border-right: 2px solid var(--secondary);
  border-bottom: 2px solid white;
  border-left: 2px solid white;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
