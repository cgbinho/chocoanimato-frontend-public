import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-self: flex-start;

  margin-top: 40px;
  padding: 2rem;

  min-width: 350px;
  text-align: center;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 14px;

  svg {
    margin-top: 2rem;
    margin-bottom: 0rem;
  }

  h3 {
    margin-top: 2rem;
  }

  > p {
    line-height: 2rem;
  }

  em {
    font-size: 1.2rem;
    font-weight: 600;
  }

  form {
    margin-top: 1rem;
  }

  a {
    display: block;
    position: right;
    margin-top: 0.5rem;
  }
`;
// export const Content = styled.div``;
