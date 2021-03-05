import styled from 'styled-components';
import { shade, cssVar } from 'polished';

import { IStepDTO } from '../../../types/multistep';

interface IProps {
  steps: IStepDTO[];
  currentStep: IStepDTO;
}

export const Container = styled.div<IProps>`
  .bg {
    width: 100%;
    height: 10px;
    background-color: var(--light_gray);
  }
  .progress {
    width: ${props => `${(props.currentStep.id / props.steps.length) * 100}%`};
    height: 10px;
    background-color: var(--secondary);
  }
`;
