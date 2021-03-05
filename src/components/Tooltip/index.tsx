import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { Container, TooltipBoxContainer, TooltipTextContainer } from './styles';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
