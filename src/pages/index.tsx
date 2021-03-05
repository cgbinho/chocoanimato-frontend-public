import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Button from '../components/Form/Button';

import {
  Container,
  Content,
  Background
} from '../styles/pages/homepage.styles';
import { GetServerSideProps } from 'next';

const homepage = () => {
  return (
    <Background>
      <Layout>
        <Container>
          <Content>
            <h1>Crie vídeos rápidos e automáticos</h1>
            <p>Utilizando padrões personalizados de diversos temas</p>
            <Button primary width="300px">
              Quero criar um vídeo
            </Button>
          </Content>
          <img src="./images/home_welcome.svg" alt="Personalizando um vídeo" />
        </Container>
      </Layout>
    </Background>
  );
};

export default homepage;
