import { usePaginatedQuery, useQuery } from 'react-query';
import axios from '../services/api';
import appConfig from '../config/app';

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
