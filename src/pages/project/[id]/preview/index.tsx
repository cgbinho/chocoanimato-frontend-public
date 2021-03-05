import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

import { HiOutlineShoppingCart } from 'react-icons/hi';

import Layout from '../../../../components/Layout';

import ModalHeader from '../../../../components/Modal/Header';
import Price from '../../../../components/Order/Price';
import TemplateTags from '../../../../components/Template/Tags';
import {
  Container,
  HeaderContainer,
  InfoContainer,
  VideoContainer,
  VideoContent
} from '../../../../styles/pages/project.preview.styles';
import { withAuth } from '../../../../components/WithAuth';
import { withAuthServerSideProps } from '../../../../hoc/withAuthServerSide';
import { BiError, BiMovie } from 'react-icons/bi';
import {
  ButtonWithIcon,
  SpinnerContainer
} from '../../../../components/Form/Button/styles';
import { fetchProject } from '../../../../queries/project';
import { ProjectNameContainer } from '../../../../styles/pages/project.styles';
import { useMutation } from 'react-query';
import {
  postRenders,
  fetchRenders,
  useRenders
} from '../../../../hooks/renders';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import Plyr from 'react-plyr';
import { useCheckout } from '../../../../hooks/checkout';
import { useRouter } from 'next/router';

const Preview = ({ initialData, initialProgressData }) => {
  const { addItemToCheckout } = useCheckout();

  const [project, setProject] = useState(initialData);
  const [fetchRenderProgress, setFetchRenderProgress] = useState(false);

  const router = useRouter();

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

  /*
  PREVIEW STATUS QUERY
  */
  const {
    status: progressStatus,
    data: progressData = initialProgressData,
    error: progressError,
    isFetching: progressIsFetching
    // enabled turns on / off this query. So we can get the render status until it's 100%.
  } = useRenders({ id: project.id, enabled: fetchRenderProgress });

  /*
  CREATE PREVIEW  MUTATITON
  */
  const [
    mutate,
    {
      isIdle: renderIsIdle,
      isLoading: renderIsLoading,
      isError: renderIsError,
      isSuccess: renderIsSuccess,
      data: renderData,
      reset: renderReset
    }
  ] = useMutation(postRenders, {
    onSuccess: data => {
      // trigger pooling 'fetchRenders'
      setFetchRenderProgress(true);
    }
  });

  /*
  RENDER FINISHED ( PREVIEW READY WE STOP FETCHING THE RENDER PROGRESS )
  */
  useEffect(() => {
    if (progressData.is_done) {
      setFetchRenderProgress(false);
    }
    // return () => {};
  }, [progressData]);

  /*
  CREATE PREVIEW
  */
  const handleCreatePreview = () => {
    mutate({ id: project.id });
  };

  const VideoLoading = ({ progressData }) => {
    const { name, is_done, percentage, url } = progressData;

    return (
      <>
        <SpinnerContainer></SpinnerContainer>
        <p>Etapa: {name}</p>
        <p>{percentage}%</p>
      </>
    );
  };

  const VideoError = ({ progressData }) => {
    const { name, is_done, percentage, url } = progressData;

    return (
      <>
        <BiError size={28} color="white" />
        <p>Ocorreu um erro ao criar o vídeo.</p>
      </>
    );
  };

  const VideoPlayer = ({ source }) => {
    return (
      <VideoContainer>
        <Plyr type="video" url={source} autoplay />
      </VideoContainer>
    );
  };

  const VideoPreview = ({ progressData }) => {
    const { name, is_done, percentage, url } = progressData;

    if (renderIsError) {
      return <VideoError progressData={progressData} />;
    }

    if (!progressError && !is_done && fetchRenderProgress) {
      return <VideoLoading progressData={progressData} />;
    }

    if (!fetchRenderProgress && !is_done) {
      return <FaArrowAltCircleDown size="80" color="white" />;
    }

    if (is_done) {
      return (
        <>
          <VideoPlayer source={url} />
          {/* <video id="videoPlayer" controls>
            <source
              src="http://localhost:3333/previews/3e729990-0570-4fa4-9da7-15aba253c0a8"
              type="video/mp4"
            />
          </video> */}
        </>
      );
    }
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
    <Layout>
      <Container>
        <HeaderContainer>
          <ModalHeader title="Falta pouco!" />
          <hr />
          <p>Veja uma prévia de como ficou o seu vídeo personalizado!</p>
        </HeaderContainer>
        <VideoContainer>
          <VideoContent>
            <VideoPreview progressData={progressData} />
          </VideoContent>
        </VideoContainer>
        <InfoContainer>
          <ProjectNameContainer>
            <h3>{project.name}</h3>
          </ProjectNameContainer>
          <p>{project.template.description}</p>
          <TemplateTags
            margin="1rem 0"
            tags={{
              category: [project.template.category],
              ratio: project.template.ratio,
              duration: project.template.duration
            }}
          />
          <Price price={0} justify="center" />
          <ButtonWithIcon primary width="100%" onClick={handleCreatePreview}>
            <BiMovie size="18" />
            Criar Prévia do Vídeo
          </ButtonWithIcon>
          <ButtonWithIcon primary width="100%" onClick={handleAddToCheckout}>
            <HiOutlineShoppingCart size="18" />
            Adicionar ao carrinho
          </ButtonWithIcon>
        </InfoContainer>
      </Container>
    </Layout>
  );
};

export default withAuth(Preview);

// We are getting the project with an authenticated user, serverside. Beautiful:
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
  async (context, user) => {
    const id = String(context.query.id);

    // Project server data:
    const initialData = await fetchProject(id);
    //
    let initialProgressData = {};

    try {
      initialProgressData = await fetchRenders({ id });
    } catch (err) {
      initialProgressData = {
        step: 0,
        name: 'Aguardando Início',
        percentage: 0,
        is_done: false
      };
    }

    return {
      props: { initialData, initialProgressData }
    };
  }
);
