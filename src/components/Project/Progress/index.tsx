import { FiFilm, FiClock } from 'react-icons/fi';
import { BsPhoneLandscape, BsPhone } from 'react-icons/bs';

import { Container } from './styles';
import { IStepDTO } from '../../../types/multistep';

interface IProps {
  steps: IStepDTO[];
  currentStep: IStepDTO;
}

const Progress: React.FC<IProps> = ({ steps, currentStep }) => {
  return (
    <Container steps={steps} currentStep={currentStep}>
      <div className="bg">
        <div className="progress"></div>
      </div>
    </Container>
  );
};

export default Progress;
