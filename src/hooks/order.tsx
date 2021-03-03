import { useQuery } from 'react-query';
import axios from '../services/api';

const fetchOrder = async (id: string) => {
  const { data } = await axios.get(`/api/orders/${id}`);
  return data;
};

const useOrder = (id: string) => {
  return useQuery<any, Error>(id, fetchOrder);
};

export { useOrder, fetchOrder };
