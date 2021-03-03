import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: grid;

  grid-auto-flow: row;
  margin: auto 30%;
  grid-gap: 8px;
  font-size: 14px;
  margin-top: 2rem;

  button {
    margin-top: 1rem;
  }

  p {
    padding: 0 0.5rem;
  }

  /* @media (max-width: 700px) {
    align-items: center;
    justify-content: space-between;
  } */
`;
