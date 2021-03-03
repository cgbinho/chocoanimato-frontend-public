import React, { Fragment } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IMultiStepDTO, IStepItemDTO } from '../../../types/multistep';
import { MultiStepContainer, StepItemContainer } from './styles';

const Separator = ({ steps, step }) => {
  if (step.id === 1) {
    return null;
  }
  return <IoIosArrowForward size="24" />;
};

const MultiStep: React.FC<IMultiStepDTO> = props => {
  const { steps } = props;

  return (
    <MultiStepContainer {...props}>
      {steps.map(stepItem => (
        <Fragment key={stepItem.id}>
          <Separator step={stepItem} {...props} />
          <StepItem {...props} step={stepItem} />
        </Fragment>
      ))}
    </MultiStepContainer>
  );
};

const StepItem: React.FC<IStepItemDTO> = props => {
  const { step } = props;

  return (
    <StepItemContainer {...props}>
      <section>
        <small>Passo {step.id}</small>
        <p>{step.name}</p>
      </section>
    </StepItemContainer>
  );
};

export default MultiStep;
