import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  a {
    margin-right: 8px;
  }

  svg {
    margin: 12px 12px 0 0;
    fill: var(--secondary);

    &:hover {
      fill: var(--secondary_dark);
      transition: fill 0.2s;
    }
  }
`;
