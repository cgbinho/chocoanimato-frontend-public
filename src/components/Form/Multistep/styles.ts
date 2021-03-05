import styled, { css } from 'styled-components';
import { shade, cssVar } from 'polished';
import { IMultiStepDTO, IStepItemDTO } from '../../../types/multistep';

export const StepItemContainer = styled.div<IStepItemDTO>`
  display: flex;
  align-items: left;

  ${props =>
    props.step.id === props.currentStep.id
      ? css`
          small {
            color: var(--secondary_dark);
            font-size: 12px;
          }
          p {
            font-size: 14px;
            font-weight: 600;
            font-style: italic;
            letter-spacing: 0.05rem;
            color: var(--secondary_dark);
            text-align: left;
          }
        `
      : css`
          small {
            color: var(--primary);
            font-size: 12px;
          }
          p {
            font-size: 14px;
            font-weight: 400;
            font-style: regular;
            color: var(--primary);
            text-align: left;
          }
        `};
`;

export const MultiStepContainer = styled.div<IMultiStepDTO>`
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 0;

  svg {
    color: var(--light_gray);
    height: 22px;
  }
`;
