import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  p {
    color: tomato;
  }

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

export const SelectInputCep = styled(Container)`
  font-size: 1rem;
  width: 50%;
`;

export const SelectInputProject = styled(Container)`
  font-size: 1rem;
`;

export const FilterSelectContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 0px;

  select {
    height: 3rem;
    font-size: 0.8rem;
    width: 150px;
    text-indent: 0.2rem;
    text-align: left;
    border-radius: 8px;
    border: 0;
    /* color: var(--secondary-dark); */
    color: #ce4a00;
    background: #fff1e9 url('/images/select_caret.svg') no-repeat;
    /* background: var(--secondary-light) url('/images/select_caret.svg') no-repeat; */
    background-position: right 10px top 50%;
    appearance: none;

    &:focus {
      outline: 0;
      border: 0;
      appearance: none;
      background: #fff1e9 url('/images/select_caret.svg') no-repeat;
      background-position: right 10px top 50%;
    }
  }

  p {
    color: tomato;
  }
`;
