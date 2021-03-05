import styled, { css } from 'styled-components';
import { shade, cssVar } from 'polished';

interface IContentProps {
  color: string;
  textColor: string;
}

// isOpen: boolean;

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
`;

export const HiddenInputContainer = styled.div`
  display: none;
`;

export const InputContainer = styled.div<IContentProps>`
  /* display: flex; */
  display: 'inline-block';
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
    border: 0;
    /*
    TEXT COLOR BASED ON CONTRAST ON THE COLOR SELECTED:
    */
    color: ${props => props.textColor};
    background-color: ${props => props.color};
    /* background-color: rgba(0, 0, 0, 0); */
    align-items: center;

    &:hover {
      /* background-color: shade(0.2, black); */
    }
  }

  svg {
    margin-right: 8px;
  }
`;

export const PopOverContainer = styled.div<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? 'none' : 'block')};
  position: 'absolute';
  z-index: '2';
`;

export const CoverContainer = styled.div`
  position: 'fixed';
  top: '0px';
  right: '0px';
  bottom: '0px';
  left: '0px';
`;

/*
PICK TEXT COLOR WITH BEST CONTRAST BASED ON BACKGROUND COLOR
bgColor: `rgba('255,255,53,1')`
*/

function pickTextColorBasedOnBgColorAdvanced(
  bgColor: string,
  lightColor: string,
  darkColor: string
): string {
  const colorString = bgColor.replace(`rgba(`, '').replace(`)`, '');
  let colorParsed = colorString.split(',');
  const r = parseInt(colorParsed[0]);
  const g = parseInt(colorParsed[1]);
  const b = parseInt(colorParsed[2]);
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map(col => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
