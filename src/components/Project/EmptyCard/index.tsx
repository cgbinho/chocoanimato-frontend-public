import React, { useState } from 'react';
import { Container, VideoContainer } from './styles';

import { ButtonWithIcon } from '../../Form/Button/styles';

import { BiVideoPlus } from 'react-icons/bi';
import { useRouter } from 'next/router';

interface IProps {
  id: string;
  name: string;
  video: string;
  thumbnail: string;
  duration: number;
  description: string;
  category: string;
  ratio: string;
  price: number;
}
const EmptyCard = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/templates');
  };

  return (
    <Container>
      <VideoContainer>
        <BiVideoPlus size="80" />
      </VideoContainer>
      <ButtonWithIcon primary width="100%" onClick={handleSubmit}>
        <BiVideoPlus size="18" />
        Criar um vídeo novo
      </ButtonWithIcon>
    </Container>
  );
};

export default EmptyCard;
