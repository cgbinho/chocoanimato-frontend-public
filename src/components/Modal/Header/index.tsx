import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import { BackIconContainer, Container } from './styles';

interface IModalHeader {
  title: string;
}

const ModalHeader: React.FC<IModalHeader> = ({ title }) => {
  const router = useRouter();
  return (
    <Container>
      <BackIconContainer>
        <a onClick={() => router.back()}>
          <IoIosArrowBack size="24px" />
        </a>
      </BackIconContainer>
      <h2>{title}</h2>
      <span />
    </Container>
  );
};

export default ModalHeader;
