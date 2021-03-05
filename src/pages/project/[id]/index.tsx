import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import Layout from '../../../components/Layout';

import Modal from '../../../components/Modal';
import {
  Container,
  Content,
  EditingContainer,
  PreviewContainer,
  ProjectNameContainer,
  SectionInfoContainer
} from '../../../styles/pages/project.styles';

import { fetchProject, updateProject } from '../../../queries/project';
import { useQueryCache, useMutation, useQuery } from 'react-query';
import Button from '../../../components/Form/Button';
import { withAuth } from '../../../components/WithAuth';
import { withAuthServerSideProps } from '../../../hoc/withAuthServerSide';

import TextField from '../../../components/Project/Form/TextField';
import ColorField from '../../../components/Project/Form/ColorField';
import { useDebouncedEffect } from '../../../hooks/utils/useDebounce';
import ImageField from '../../../components/Project/Form/ImageField';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ModalHeader from '../../../components/Modal/Header';
import MultiStep from '../../../components/Form/Multistep';
import SoundField from '../../../components/Project/Form/SoundField';
import { FiClock, FiEdit } from 'react-icons/fi';
import TemplateTags from '../../../components/Template/Tags';
import LottiePreview from '../../../components/Project/LottiePreview';

import { useLottie } from 'react-lottie-hook';
import { useAuth } from '../../../hooks/auth';
import { useRouter } from 'next/router';

interface FieldData {
  id: number;
  text: string;
  fieldname: string;
  section: string;
  category: string;
  value: string;
  toolTip: string;
  propPath?: string;
  width?: number;
  height?: number;
}
interface SectionData {
  id: number;
  endpoint: number;
  inpoint: number;
  name: string;
}

interface DataToSubmit {
  [key: string]: string;
}

function Project({ initialData }) {
  const router = useRouter();
  const [project, setProject] = useState(initialData);
  // const [animationData] = useState(project.lottie);
  // const [animationData, setAnimationData] = useState(project.lottie);
  const [currentSection, setCurrentSection] = useState(0);
  const currentSectionDuration = (
    (project.sections[currentSection].endpoint -
      project.sections[currentSection].inpoint) /
    30
  ).toFixed(1);

  const isLastSection =
    currentSection + 1 === project.sections.length ? true : false;

  // Form data to debounce, before mutation:
  const [dataToSubmit, setDataToSubmit] = useState<DataToSubmit>({
    id: project.id,
    project_name: project.name
  });

  const queryCache = useQueryCache();

  // Mutation to update project data
  const [
    mutate,
    { isIdle, isLoading, isError, isSuccess, data, reset }
  ] = useMutation(updateProject, {
    onSuccess: data => {
      setProject(data);
      controls.selectAnimation(data.lottie);

      // controls.playSegments([
      //   project.sections[currentSection].inpoint,
      //   project.sections[currentSection].endpoint
      // ]);
      // setAnimationData(data.lottie);
      queryCache.invalidateQueries(`/projects/${project.id}`);
    }
  });

  // -----------------------------------------------------------------
  // LOTTIE

  const [lottieRef, { isPaused, isStopped }, controls] = useLottie({
    renderer: 'svg',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: false
    },
    animationData: project.lottie
  });

  React.useEffect(() => {
    // Load section segment to play:
    controls.playSegments([
      project.sections[currentSection].inpoint,
      project.sections[currentSection].endpoint
    ]);
  }, [currentSection]);

  const onPlay = React.useCallback(() => {
    controls.play();
  }, [controls]);

  const onPause = React.useCallback(() => {
    controls.pause();
  }, [controls]);

  const onStop = React.useCallback(() => {
    controls.stop();
  }, [controls]);

  // -----------------------------------------------------------------
  // debounce mutation
  useDebouncedEffect(() => mutate(dataToSubmit), 800, [dataToSubmit]);

  const methods = useForm({
    defaultValues: project.form_values,
    mode: 'onBlur'
  });

  // used only when submitting the form manually.
  const onSubmit = methods.handleSubmit(data => {
    // mutate(dataToSubmit);
  });

  // When field is updated, we store the data to debounce
  const handleChangeField = data => {
    setDataToSubmit({
      id: project.id,
      ...data
    });
  };

  const handleNextPage = () => {
    setCurrentSection(section => {
      if (section < project.sections.length - 1) {
        return section + 1;
      }
      return section;
    });
  };

  const handlePrevPage = () => {
    setCurrentSection(section => {
      if (section !== 0) {
        return section - 1;
      }
      return section;
    });
  };

  const handleToPreview = () => {
    router.push(`/project/${project.id}/preview`);
  };

  return (
    <Layout>
      <Modal>
        <Container>
          <ModalHeader title="Personalização" />
          <MultiStep
            currentStep={project.sections[currentSection]}
            steps={project.sections}
          />
          <hr />
          {isLoading && <p>Carregando...</p>}
          {isError && <p>Ocorreu um erro</p>}
          <Content>
            {/* PREVIEW CONTAINER */}
            <PreviewContainer>
              {!isLoading ? (
                <LottiePreview
                  project={project}
                  currentSection={currentSection}
                  lottieRef={lottieRef}
                  onPlay={onPlay}
                  onPause={onPause}
                  onStop={onStop}
                />
              ) : (
                <p>Carregando...</p>
              )}
              <ProjectNameContainer>
                <h3>{project.name}</h3>
                <a href="#">
                  <FiEdit size={18} />
                </a>
              </ProjectNameContainer>
              <SectionInfoContainer>
                <h4>{project.sections[currentSection].name}</h4>
                <FiClock size={18} />
                <span>{currentSectionDuration} segundos</span>
              </SectionInfoContainer>
              <p>
                Descrição do vídeo, com informações sobre o seu estilo e afins.
              </p>
              <TemplateTags
                margin="1rem 0"
                tags={{
                  category: [project.template.category],
                  ratio: project.template.ratio,
                  duration: project.template.duration
                }}
              />
              {/* <Price price={project.template.price} justify="center" /> */}
              {/* <ButtonWithIcon primary width="100%">
                <HiOutlineShoppingCart size="18" />
                Adicionar ao carrinho
              </ButtonWithIcon> */}
            </PreviewContainer>
            {/* EDITING CONTAINER */}
            <EditingContainer>
              <FormProvider {...methods}>
                <form onSubmit={onSubmit} method="post">
                  {project.fields.map(
                    (field: FieldData) =>
                      field.section ===
                        project.sections[currentSection].name && (
                        <React.Fragment key={field.id}>
                          <Field
                            project={project}
                            field={field}
                            handleChangeField={handleChangeField}
                          />
                          <hr />
                        </React.Fragment>
                      )
                  )}
                  {/* PAGINATION */}
                  {!isLastSection ? (
                    <Button
                      primary
                      isLoading={isLoading}
                      onClick={handleNextPage}
                    >
                      Avançar
                      <IoIosArrowForward size={18} />
                    </Button>
                  ) : (
                    <Button
                      primary
                      isLoading={isLoading}
                      onClick={handleToPreview}
                    >
                      Avançar
                      <IoIosArrowForward size={18} />
                    </Button>
                  )}
                  <Button isLoading={isLoading} onClick={handlePrevPage}>
                    <IoIosArrowBack size={18} />
                    Voltar
                  </Button>
                </form>
              </FormProvider>
            </EditingContainer>
          </Content>
          <pre>{JSON.stringify(project.fields, null, 2)}</pre>
        </Container>
      </Modal>
    </Layout>
  );
}

// export default Project;

export default withAuth(Project);

// We are getting the project with an authenticated user, serverside. Beautiful:
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
  async (context, user) => {
    const id = String(context.query.id);

    // Project server data:
    const initialData = await fetchProject(id);

    return {
      props: { initialData }
    };
  }
);

const Field = props => {
  const { field } = props;

  switch (field.category) {
    case 'text':
      return <TextField {...props} />;
    case 'color':
      return <ColorField {...props} />;
    case 'image':
      return <ImageField {...props} />;
    case 'sound':
      return <SoundField {...props} />;
    default:
      return <></>;
  }
};
