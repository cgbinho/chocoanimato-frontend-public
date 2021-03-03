import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaPhotoVideo } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useMutation, useQueryCache } from 'react-query';
import { toast } from 'react-toastify';
import { useCheckout } from '../../../hooks/checkout';
import { deleteProject } from '../../../hooks/projects';
import { ButtonWithIcon } from '../../Form/Button/styles';
import ModalDeleteProject from '../../ModalDeleteProject';
import Price from '../../Order/Price';
import { ImageContainer } from '../../Template/Card/styles';
import Tags from '../../Template/Tags';
import Title from '../../Template/Title';
import { Container, EditContainer, InfoContainer } from './styles';

interface IProps {
  id: string;
  name: string;
  video: string;
  thumbnail: string;
  duration: number;
  description: string;
  category: string;
  ratio: string;
  price: number;
}
const ProjectCard = ({ project }) => {
  const router = useRouter();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const queryCache = useQueryCache();

  const {
    id,
    name,
    template: {
      video,
      thumbnail,
      duration,
      ratio,
      price,
      category,
      description
    }
  } = project;

  const [
    mutate,
    {
      isLoading: isLoadingDeleteProject,
      isError: isErrorDeleteProject,
      isSuccess: isSuccessDeleteProject,
      data: dataDeleteProject,
      error: errorDeleteProject,
      reset: resetDeleteProject
    }
  ] = useMutation(deleteProject, {
    onSuccess: data => {
      /*      IF PROJECT IS SUCCESSFULLY DELETED:      */
      toast.success(`Projeto deletado com sucesso!`);
      queryCache.invalidateQueries(`projects`);
    },
    /*      IF REMOVE PROJECT FAILED:      */
    onError: error => {
      toast.error(`Falha ao remover o Projeto!`);
    }
  });

  const { addItemToCheckout } = useCheckout();

  const handleEdit = () => {
    router.push(`project/${id}`);
  };

  const handleDelete = () => {
    mutate({ id });
    setDeleteDialogOpen(false);
  };

  const handleAddToCheckout = () => {
    addItemToCheckout({
      id,
      name,
      template: { duration, ratio, price, category, description }
    });
    router.push('/checkout');
  };

  return (
    <Container>
      <ImageContainer>
        <a onClick={handleEdit}>
          <img src={thumbnail} alt="Template Thumbnail" />
        </a>
      </ImageContainer>
      <InfoContainer>
        <Title name={name} description={description} />
        <Tags margin="1rem 0" tags={{ category, ratio, duration }} />
        <Price price={price} justify="center" />
        <EditContainer>
          <ModalDeleteProject
            isOpen={isDeleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            setDeleteProject={handleDelete}
          />
          <ButtonWithIcon width="100%" onClick={handleEdit}>
            <FaPhotoVideo size="18" />
            Personalizar
          </ButtonWithIcon>
        </EditContainer>
        <ButtonWithIcon primary width="100%" onClick={handleAddToCheckout}>
          <HiOutlineShoppingCart size="18" />
          Adicionar ao carrinho
        </ButtonWithIcon>
      </InfoContainer>
    </Container>
  );
};

export default ProjectCard;
