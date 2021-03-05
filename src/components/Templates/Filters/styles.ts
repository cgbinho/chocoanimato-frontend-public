import styled from 'styled-components';
import { shade, cssVar } from 'polished';

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
      cursor: pointer;
    }

    .submit_container {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 14px;
      }
    }

    @media (max-width: 700px) {
      grid-template-columns: repeat(auto-fit, minmax(90vw, min-content));
      align-items: center;
      justify-content: space-between;
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
