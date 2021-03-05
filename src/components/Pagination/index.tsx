import React from 'react';
import Button from '../Form/Button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { PaginationContainer } from './styles';

const Pagination = ({
  page,
  handleNextPage,
  handlePrevPage,
  page_total,
  total
}) => {
  /*
  IF PAGE ITEMS IS LOWER THAN 6 ( 6 ITEMS PER PAGE ) IT MEANS IT'S LAST PAGE.
  */
  const isLastPage = page_total < 6 ? true : false;
  const NextPageButton = () => {
    return (
      <>
        {isLastPage ? (
          <>
            <Button
              primary
              onClick={handleNextPage}
              disabled={isLastPage}
              width="100%"
            >
              <p>Fim dos resultados</p>
            </Button>
          </>
        ) : (
          <Button
            primary
            onClick={handleNextPage}
            disabled={isLastPage}
            width="100%"
          >
            <p>Próxima</p>
            <IoIosArrowForward size={18} />
          </Button>
        )}
      </>
    );
  };

  return (
    <PaginationContainer>
      <NextPageButton />
      {!(page === 0) && (
        <Button onClick={handlePrevPage} width="100%">
          <IoIosArrowBack size={18} />
          Anterior
        </Button>
      )}
    </PaginationContainer>
  );
};
export default Pagination;
