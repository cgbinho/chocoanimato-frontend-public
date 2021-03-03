import { useQuery } from 'react-query';
import axios from '../services/api';

const fetchCep = async (cep: string) => {
  const { data } = await axios.get(`/api/cep`, { params: { cep } });
  return data;
};

const useCep = (cep: string) => {
  return useQuery<any, Error>([cep], fetchCep, {
    retry: 2,
    enabled: cep, // If we have cep, then enable the query on render
    refetchOnMount: false
  });
};

export { useCep, fetchCep };
