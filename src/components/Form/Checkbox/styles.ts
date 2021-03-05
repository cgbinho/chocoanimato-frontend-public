import styled from 'styled-components';
import { shade, cssVar } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: tomato;
  }
`;

export const Content = styled.div`
  display: inline-block;
  vertical-align: middle;

  margin-top: 8px;

  input {
    margin-right: 14px;
    color: tomato;
    transform: scale(1.5);
  }
`;
