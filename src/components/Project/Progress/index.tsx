import { IStepDTO } from '../../../types/multistep';
import { Container } from './styles';

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
