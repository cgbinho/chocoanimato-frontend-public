import { useQuery } from 'react-query';
import axios from '../services/api';

const fetchCoupon = async (code: string) => {
  const { data } = await axios.get(`/api/coupons`, { params: { code } });
  return data;
};

const useCoupon = (code: string) => {
  return useQuery<any, Error>([code], fetchCoupon, {
    retry: 2,
    enabled: code, // If we have code, then enable the query on render
    refetchOnMount: false
  });
};

export { useCoupon, fetchCoupon };
