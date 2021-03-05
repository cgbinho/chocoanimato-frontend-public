import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { StyledModal, Container, Content, ButtonsContainer } from './styles';
import Button from '../Form/Button';
import { AiOutlineCloseCircle, AiOutlineDelete } from 'react-icons/ai';
interface IModalProps {
  isOpen: boolean;
  setOpen: Function;
  setDeleteProject: () => void;
}

const ModalDeleteProject: React.FC<IModalProps> = ({
  children,
  isOpen,
  setOpen,
  setDeleteProject
}) => {
  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <Container>
      <a onClick={toggleModal}>
        <AiOutlineDelete size={24} />
      </a>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Content>
          <a onClick={toggleModal}>
            <AiOutlineCloseCircle size={28} />
          </a>
          <h2>Alerta!</h2>
          <h3>Deseja realmente remover o projeto?</h3>
          <p>
            Esta ação não tem volta, removendo este projeto ele será apagado
            para sempre.
          </p>
          <ButtonsContainer>
            <Button primary width={'100%'} onClick={toggleModal}>
              Cancelar
            </Button>
            <Button width={'100%'} onClick={setDeleteProject}>
              Remover Projeto
            </Button>
          </ButtonsContainer>
        </Content>
      </StyledModal>
    </Container>
  );
};

export default ModalDeleteProject;
