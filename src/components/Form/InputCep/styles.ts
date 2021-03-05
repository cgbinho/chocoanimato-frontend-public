import styled, { css } from 'styled-components';
import Input from '../../Form/Input';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  aside {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    cursor: pointer;
  }

  label {
    margin-top: 0;
  }

  .status {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 4px;
    margin-top: 16px;
    color: var(--success_color);
  }

  .close {
    svg {
      fill: var(--secondary_dark);
    }
  }

  .error {
    color: tomato;
  }

  /* input {
    flex: 1;
    width: 50%;
  } */
`;
