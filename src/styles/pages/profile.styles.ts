import styled from 'styled-components';
import { shade, cssVar } from 'polished';

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    margin: 1rem;
  }
  h2 {
    margin-bottom: 2rem;
    text-align: center;
  }

  p {
    line-height: 2rem;
    text-align: center;
  }

  small {
    line-height: 2rem;
  }
`;
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

  h1,
  h3 {
    text-align: center;
    margin-top: 2rem;
  }

  form {
    margin-top: 1rem;
  }

  a {
    display: block;
    position: right;
    margin-top: 0.5rem;
  }

  > p {
    margin-top: 2rem;
  }

  em {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
// export const Content = styled.div``;
