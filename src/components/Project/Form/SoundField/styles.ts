import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  > p {
    color: tomato;
  }

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin-top: 1rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  select {
    /* flex: 1; */
    padding: 14px;
    margin-top: 4px;
    height: 3.3rem;
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

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 14px;
  width: 100%;
  margin-top: 8px;

  border: 2px solid var(--light_gray);
  border-radius: 0.5rem;

  color: var(--primary);
  font-size: 14px;
  background: transparent;
  transition: border 0.2s;

  input {
    width: 90%;
    border: 0;
    background: transparent;
    font-size: 1rem;
    color: var(--primary);

    &::placeholder {
      color: var(--dark_gray);
    }
  }

  /*
  IF AN ELEMENT INSIDE THIS ELEMENT (input in this case) GETS FOCUS:
  */
  &:focus-within {
    border: 2px solid var(--secondary);
  }

  svg {
    flex-shrink: 0;
    margin-right: 8px;
  }
`;
