import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;

  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;

  height: 40px;
  width: 100%;
  margin-top: 1rem;
  color: #828282;
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 0.2rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.08);

  &:hover {
    background: ${shade(0.02, `#ffff`)};
  }

  img {
    height: 18px;
    padding: 0 14px 0 14px;
  }
`;
