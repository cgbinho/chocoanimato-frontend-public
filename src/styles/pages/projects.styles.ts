import styled from 'styled-components';
import { shade, cssVar } from 'polished';

export const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: min-content 1fr;
  margin: 2rem;
  text-align: center;
`;

export const FiltersContainer = styled.div`
  form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, min-content));
    align-content: flex-start;
    align-items: center;
    justify-content: center;
    grid-gap: 14px;

    a {
      font-size: 14px;
    }

    @media (max-width: 700px) {
      grid-template-columns: repeat(auto-fit, minmax(350px, min-content));
      align-content: flex-start;
    }
  }
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 8px;
  font-size: 14px;

  @media (max-width: 700px) {
    align-items: center;
    justify-content: space-between;
  }
`;

export const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, min-content));
  grid-gap: 20px;

  align-content: flex-start;
  justify-content: center;

  padding-top: 2rem;
`;
