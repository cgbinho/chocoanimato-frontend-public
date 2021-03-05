import { Container } from './styles';

import { BsPlayFill, BsPauseFill, BsStopFill } from 'react-icons/bs';

interface IProps {
  onPlay: any;
  onPause: any;
  onStop: any;
}

const Controls: React.FC<IProps> = ({ onPlay, onPause, onStop }) => {
  return (
    <Container>
      <a onClick={onPlay}>
        <BsPlayFill size={34} />
      </a>
      <a onClick={onPause}>
        <BsPauseFill size={34} />
      </a>
      <a onClick={onStop}>
        <BsStopFill size={34} />
      </a>
    </Container>
  );
};

export default Controls;
