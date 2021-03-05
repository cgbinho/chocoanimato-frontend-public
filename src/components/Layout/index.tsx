import Header from '../Header';
import NavBar from '../NavBar';
import Footer from '../Footer';

import { Container } from './styles';

const Layout: React.FC = props => {
  return (
    <Container>
      {/* <NavBar /> */}
      {props.children}
      <Footer />
    </Container>
  );
};

export default Layout;
