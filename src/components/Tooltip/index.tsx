import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Container, TooltipBoxContainer, TooltipTextContainer } from './styles';

interface ITooltipProps {
  message: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ children, message }) => {
  return (
    <Container>
      <TooltipTextContainer>
        <AiOutlineInfoCircle size={20} />
      </TooltipTextContainer>
      <TooltipBoxContainer>
        <p>{message}</p>
      </TooltipBoxContainer>
    </Container>
  );
};

export default Tooltip;
