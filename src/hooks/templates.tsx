import { usePaginatedQuery } from 'react-query';
import axios from '../services/api';

interface ITemplateQuery {
  category: string;
  duration: number;
  ratio: string;
  sort: string;
  page: number;
}

const fetchTemplates = async (params: ITemplateQuery) => {
  const { data } = await axios.get(`/api/templates`, {
    params
  });
  return data;
};

const useTemplates = ({
  category,
  duration,
  ratio,
  sort,
  page
}: ITemplateQuery) => {
  return usePaginatedQuery<any, Error>(
    [{ category, duration, ratio, sort, page }],
    fetchTemplates
  );
};

export { useTemplates, fetchTemplates };
