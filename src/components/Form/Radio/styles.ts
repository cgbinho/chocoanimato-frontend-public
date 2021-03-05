import styled from 'styled-components';
import { shade, cssVar } from 'polished';
import { BsCaretDownFill } from 'react-icons/bs';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-left: 8px;
  }

  p {
    color: tomato;
  }
  /* input[type='radio'] {
    display: none;
    pointer-events: none;

    & + label {
      cursor: pointer;
      display: flex;

      svg {
        width: 2rem;
        border-radius: 4px;
        stroke: var(--secondary);

        .box {
          stroke: var(--light_gray);
          stroke-width: 8;
          fill: transparent;
        }
        .check {
          stroke-width: 8;
          stroke: var(--secondary);
          stroke-dasharray: 70;
          stroke-dashoffset: 70;
          fill: none;
          transition: stroke-dashoffset 0.3s linear;
        }
      }

      span {
        padding-top: 0.3em;
        margin-left: 4px;
      }
    }

    &:checked {
      label {
        .box {
          stroke-dashoffset: 320;
        }
        .check {
          stroke-dashoffset: 0;
        }
      }
    }
  } */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
