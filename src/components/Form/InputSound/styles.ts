import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  flex-direction: column;

  margin-top: 8px;

  > p {
    color: tomato;
  }

  select {
    flex: 1;
    padding: 14px;
    margin-top: 4px;
    height: 3rem;
    width: 100%;
    text-indent: 0.2rem;
    text-align: left;
    border-radius: 8px;
    border: 2px solid var(--light_gray);
    color: var(--primary);
    background: transparent url('/images/select_caret.svg') no-repeat;
    background-position: right 10px top 50%;
    appearance: none;

    &:focus {
      border: 2px solid var(--secondary);
      outline: 0;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
