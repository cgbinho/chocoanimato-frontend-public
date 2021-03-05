import Layout from '../../components/Layout';

import ProjectCard from '../../components/Project/Card';
import EmptyCard from '../../components/Project/EmptyCard';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';

import {
  Container,
  ResultsContainer
} from '../../styles/pages/projects.styles';
import { useState } from 'react';
import { useProjects } from '../../hooks/projects';
import Pagination from '../../components/Pagination';
import { withAuthServerSideProps } from '../../hoc/withAuthServerSide';
import { withAuth } from '../../components/WithAuth';
import { GetServerSideProps } from 'next';

type IListProps = {
  name: string;
  value: string;
};

type IFormInputs = {
  name: string;
  email: string;
  tax_id: string;
};

const Projects = () => {
  const [page, setPage] = useState(0);

  const { isLoading, error, data } = useProjects({
    page
  });

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };
  return (
    <Layout>
      <Container>
        <h2>Meus Projetos</h2>
        {isLoading && (
          <LoadingComponent message="Carregando lista de Projetos..." />
        )}
        {error && (
          <ErrorComponent
            hasIcon={true}
            message="Ocorreu um erro ao carregar os Projetos, tente novamente."
          />
        )}
        <ResultsContainer>
          {data && <ProjectsList projects={data.results} />}
          <EmptyCard />
        </ResultsContainer>
        <Pagination
          page={page}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page_total={data?.page_total}
          total={data?.total}
        />
      </Container>
    </Layout>
  );
};

const ProjectsList = ({ projects }) => {
  return (
    <>
      {projects.map(project => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </>
  );
};

export default withAuth(Projects);
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
