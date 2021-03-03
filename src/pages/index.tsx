import Button from '../components/Form/Button';
import Layout from '../components/Layout';
import {
  Background,
  Container,
  Content
} from '../styles/pages/homepage.styles';

const homepage = () => {
  return (
    <Background>
      <Layout>
        <Container>
          <Content>
            <h1>FRONTEND TEST</h1>
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
