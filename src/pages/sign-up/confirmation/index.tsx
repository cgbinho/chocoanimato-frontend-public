import Button from '../../../components/Form/Button';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import Layout from '../../../components/Layout';

import {
  Container,
  Content,
  IconContainer
} from '../../../styles/pages/confirmation.styles';

const OrderSuccess = () => {
  return (
    <Layout>
      <Container>
        <Content>
          <IconContainer>
            <IoMdCheckmarkCircleOutline size={62} />
          </IconContainer>
          <h2>Seu email foi confirmado com sucesso!</h2>
          <p>Agora você já pode criar seus vídeos.</p>
        </Content>
        <Button primary width="100%">
          Criar um vídeo novo
        </Button>
      </Container>
    </Layout>
  );
};

export default OrderSuccess;
