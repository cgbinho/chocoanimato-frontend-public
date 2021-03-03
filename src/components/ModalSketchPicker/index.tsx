import React from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Container, Content, StyledModal } from './styles';

interface IModalProps {
  isOpen: boolean;
  setOpen: Function;
  color: string;
  onChange: ColorChangeHandler;
}

const ModalSketchPicker: React.FC<IModalProps> = ({
  children,
  isOpen,
  setOpen,
  color,
  onChange
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
          <SketchPicker color={color} onChange={onChange} />
        </Content>
      </StyledModal>
    </Container>
  );
};

export default ModalSketchPicker;
