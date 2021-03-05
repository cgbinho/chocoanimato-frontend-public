import { useRouter } from 'next/router';

import { Container, Content, BackIconContainer } from './styles';

import { IoIosArrowBack } from 'react-icons/io';

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
