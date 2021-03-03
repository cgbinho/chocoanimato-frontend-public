import styled from 'styled-components';
import { shade, cssVar } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-self: flex-start;

  margin-top: 40px;
  padding: 2rem;

  width: 350px;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 14px;

  > p {
    margin-top: 2rem;
  }

  form {
    margin-top: 1rem;
  }

  a {
    display: block;
    position: right;
    margin-top: 0.5rem;
    text-align: right;
  }
`;
// export const Content = styled.div``;
