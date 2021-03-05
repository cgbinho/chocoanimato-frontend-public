import { usePaginatedQuery, useQuery } from 'react-query';
import axios from '../services/api';

interface IOrderQuery {
  page: number;
}

const fetchOrders = async (params: IOrderQuery) => {
  const { data } = await axios.get(`/api/orders`, {
    params
  });
  return data;
};

const useOrders = ({ page }: IOrderQuery) => {
  return usePaginatedQuery<any, Error>([{ page }], fetchOrders);
};

export { useOrders, fetchOrders };
