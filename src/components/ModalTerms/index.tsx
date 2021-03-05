import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { StyledModal, Container, Content } from './styles';
import Button from '../Form/Button';
import { AiOutlineCloseCircle } from 'react-icons/ai';
// interface IModalTermsProps {
//   isOpen: boolean;
// }

const ModalTerms: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <Container>
      <a onClick={toggleModal}>Clique aqui para ver os termos de Uso.</a>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Content>
          <a onClick={toggleModal}>
            <AiOutlineCloseCircle size={28} />
          </a>
          <h2> Termos de uso do serviço</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, numquam fuga magnam repudiandae hic quam dolorum
            quidem, aspernatur reiciendis sint, praesentium quis deserunt rerum
            explicabo eos ipsum vitae vel nulla!
          </p>
        </Content>
      </StyledModal>
    </Container>
  );
};

export default ModalTerms;
