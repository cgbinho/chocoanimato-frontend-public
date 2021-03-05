import styled, { css } from 'styled-components';
import { shade, cssVar } from 'polished';

interface IContentProps {
  color: string;
  textColor: string;
}
export const Container = styled.label`
  display: flex;
  flex-direction: column;

  margin-top: 8px;

  > p {
    color: tomato;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HiddenInputContainer = styled.div`
  display: none;
`;

export const InputContainer = styled.div<IContentProps>`
  display: flex;
  align-items: center;

  border: 2px solid var(--light_gray);
  border-radius: 0.5rem;
  padding: 4px;
  margin-top: 4px;
  width: 100%;
  color: var(--primary);
  font-size: 14px;
  background: transparent;
  transition: border 0.2s;

  /*
    IF AN ELEMENT INSIDE THIS ELEMENT (input in this case) GETS FOCUS:
    */
  &:focus-within {
    border: 2px solid var(--secondary);
  }

  button {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 46px;
    border-radius: 0.4rem;
    /* border-radius: 8px; */
    border: 0;
    color: ${props => props.textColor};
    background-color: ${props => props.color};
    align-items: center;

    &:hover {
      background-color: ${props => shade(0.2, props.color)};
    }
  }

  svg {
    margin-right: 8px;
  }
`;

// const InputContainerProps = styled.div.attrs(props => ({
//     style: {
//       background: props.color,
//     },
//   }))`width: 100%;
