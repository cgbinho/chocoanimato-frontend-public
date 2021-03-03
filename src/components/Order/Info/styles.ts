import styled, { css } from 'styled-components';

interface IOrderStatusProps {
  status: number;
}

export const Container = styled.div<IOrderStatusProps>`
  display: grid;
  grid-auto-flow: row;
  /* grid-gap: 1rem; */
  margin-top: 0.5rem;

  p {
    text-align: center;
  }
  section {
    margin: 0.2rem 0;

    span {
      margin-left: 8px;
    }
  }
  ${props =>
    props.status === 4
      ? css`
          em {
            color: var(--success_color);
          }
        `
      : css`
          em {
            color: var(--secondary_dark);
            font-size: 16px;
            font-weight: 400;
            /* font-style: regular; */
          }
        `};
`;
