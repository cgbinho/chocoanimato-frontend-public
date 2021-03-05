import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { StyledModal, Container, Content } from './styles';
import Button from '../Form/Button';
import { AiOutlineCloseCircle } from 'react-icons/ai';
interface IModalProps {
  isOpen: boolean;
  setOpen: Function;
  setRedirection: () => void;
}

const ModalConfirmEmail: React.FC<IModalProps> = ({
  children,
  isOpen,
  setOpen,
  setRedirection
}) => {
  // const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <Container>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        beforeClose={setRedirection}
      >
        <Content>
          <a onClick={toggleModal}>
            <AiOutlineCloseCircle size={28} />
          </a>
          <h2> Bem vindo ao Choco Animato!</h2>
          <h3>Apenas mais um passo!</h3>
          <p>
            Enviamos um email de confirmação para o seu email de cadastro.
            <br /> Siga as instruções para confirmar a sua conta!
          </p>
        </Content>
      </StyledModal>
    </Container>
  );
};

export default ModalConfirmEmail;
