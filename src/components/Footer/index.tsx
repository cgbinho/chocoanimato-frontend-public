import { Container } from './styles';

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Container>
      <p>Choco Animato © {year} - São Paulo - SP</p>
    </Container>
  );
};

export default Footer;
