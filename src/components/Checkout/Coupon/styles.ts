import styled, { css } from 'styled-components';
import Input from '../../Form/Input';
import { Container } from '../../Form/Input/styles';

export const CouponContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-right: 16px;
    flex: 1;
    text-align: right;
  }

  /* p:last-child {
    color: red;
  } */

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    cursor: pointer;
    margin: 8px;
  }

  label {
    margin-top: 0;
  }

  .ok {
    color: var(--success_color);
    margin-right: 8px;
  }

  .error {
    color: tomato;
  }

  input {
    flex: 0;
    width: 70%;
  }
`;
