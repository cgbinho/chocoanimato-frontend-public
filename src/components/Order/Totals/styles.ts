import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  section {
    display: flex;
    justify-content: space-between;
    padding-top: 0.5rem;
  }
  .discount {
    color: var(--success_color);
  }
  /* justify-content: flex-between; */
`;
