import React, { useState } from 'react';
import { StyledModal, Container, Content, VideoContainer } from './styles';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Plyr from 'react-plyr';

interface IModalProps {
  isOpen: boolean;
  setOpen(isOpen: boolean): void;
  video: string;
  thumbnail: string;
  // setRedirection: () => void;
}

const Video = ({ source, thumbnail }) => {
  return (
    <VideoContainer>
      <Plyr type="video" url={source} autoplay />
    </VideoContainer>
  );
};

const ModalPlayer: React.FC<IModalProps> = ({
  children,
  isOpen,
  setOpen,
  video,
  thumbnail
}) => {
  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <Container>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Content>
          <a onClick={toggleModal}>
            <AiOutlineCloseCircle size={28} />
          </a>
          <Video source={video} thumbnail={thumbnail} />
        </Content>
      </StyledModal>
    </Container>
  );
};

export default ModalPlayer;
