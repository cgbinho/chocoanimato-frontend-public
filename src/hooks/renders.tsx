import { useQuery } from 'react-query';
import axios from '../services/api';

interface IQuery {
  id: string;
  enabled?: boolean;
}

const fetchRenders = async ({ id }: IQuery) => {
  const { data } = await axios.get(`/api/render-infos/${id}`);
  return data;
};

const postRenders = async ({ id }: IQuery) => {
  const { data } = await axios.post(`/api/render-infos/${id}`);
  return data;
};

const useRenders = ({ id, enabled }: IQuery) => {
  return useQuery<any, Error>([{ id }], fetchRenders, {
    // enable fetch the data
    enabled,
    refetchInterval: 2000
  });
};

export { useRenders, postRenders, fetchRenders };
