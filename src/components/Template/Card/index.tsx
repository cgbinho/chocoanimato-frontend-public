import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createProject } from '../../../hooks/projects';
import Button from '../../Form/Button';
import ModalPlayer from '../../ModalPlayer';
import Price from '../../Order/Price';
import Tags from '../Tags';
import Title from '../Title';
import {
  Container,
  ImageContainer,
  InfoContainer,
  TitleContainer
} from './styles';

interface IProps {
  user: object;
  template: {
    id: string;
    video: string;
    thumbnail: string;
    name: string;
    duration: number;
    description: string;
    category: string[];
    ratio: string;
    price: number;
  };
}

const TemplateCard = ({ user, template }: IProps) => {
  const {
    id,
    name,
    video,
    thumbnail,
    duration,
    description,
    category,
    ratio,
    price
  } = template;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [
    mutate,
    { isLoading, isError, isSuccess, data, error, reset }
  ] = useMutation(createProject, {
    onSuccess: data => {
      toast.success(`Projeto criado com sucesso!`);
      router.push(`project/${data.id}`);
    },
    onError: error => {
      toast.error(`Falha ao criar o Projeto!`);
    }
  });

  const handleSubmit = () => {
    mutate({ id });
  };

  const handleSignUp = () => {
    console.log('Cadastrar!');
    router.push('/sign-up');
  };

  return (
    <Container>
      <ImageContainer>
        <a onClick={() => setIsOpen(!isOpen)}>
          <img src={thumbnail} alt="Template Thumbnail" />
        </a>
      </ImageContainer>
      <TitleContainer>
        <Title name={name} description={description} />
      </TitleContainer>
      <InfoContainer>
        <Tags margin="1rem 0" tags={{ category, ratio, duration }} />
        <Price price={price} justify="center" />
        {user ? (
          <Button primary width="100%" onClick={handleSubmit}>
            Personalizar
          </Button>
        ) : (
          <Button primary width="100%" onClick={handleSignUp}>
            Comece já!
          </Button>
        )}
      </InfoContainer>
      <ModalPlayer
        isOpen={isOpen}
        setOpen={setIsOpen}
        video={video}
        thumbnail={thumbnail}
      />
    </Container>
  );
};

export default TemplateCard;
