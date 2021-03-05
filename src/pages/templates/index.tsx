import Layout from '../../components/Layout';
import TemplateCard from '../../components/Template/Card';
import Filters from '../../components/Templates/Filters';
import {
  Container,
  ResultsContainer
} from '../../styles/pages/templates.styles';
import React, { useState } from 'react';
import { useTemplates } from '../../hooks/templates';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../hooks/auth';

const Templates = () => {
  const { user } = useAuth();
  console.log(user);

  const [category, setCategory] = useState('todas');
  const [page, setPage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ratio, setRatio] = useState('todas');
  const [sort, setSort] = useState('DESC');

  const {
    isLoading,
    isError,
    error,
    resolvedData,
    latestData,
    isFetching
  } = useTemplates({
    category,
    duration,
    ratio,
    sort,
    page
  });

  const handleNextPage = () => {
    setPage(old => old + 1);
  };

  const handlePrevPage = () => {
    // setPage(page - 1);
    setPage(old => Math.max(old - 1, 0));
  };

  return (
    <Layout>
      <Container>
        <Filters
          setCategory={setCategory}
          setDuration={setDuration}
          setRatio={setRatio}
          setSort={setSort}
        />
        {isLoading && <LoadingComponent message="Carregando resultados..." />}
        {error && (
          <ErrorComponent
            hasIcon={true}
            message={`Ocorreu um erro ao carregar os dados - ${error.message}`}
          />
        )}
        <ResultsContainer>
          {resolvedData && (
            <TemplatesList user={user} templates={resolvedData.results} />
          )}
        </ResultsContainer>
        <Pagination
          page={page}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page_total={resolvedData?.page_total}
          total={resolvedData?.total}
        />
      </Container>
    </Layout>
  );
};

const TemplatesList = ({ templates, user }) => {
  return (
    <>
      {templates.map(template => (
        <TemplateCard key={template.id} user={user} template={template} />
      ))}
    </>
  );
};

export default Templates;
