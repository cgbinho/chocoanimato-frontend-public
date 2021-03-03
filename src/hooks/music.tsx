import { useQuery } from 'react-query';
import axios from '../services/api';

const fetchMusic = async () => {
  const { data } = await axios.get(`/api/music`);
  return data;
};

const useMusic = () => {
  return useQuery<any, Error>('music', fetchMusic);
};

export { useMusic, fetchMusic };
