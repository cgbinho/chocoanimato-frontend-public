import axios from '../services/api';

// interface IQueryData {
//   name: string;
//   email: string;
//   message: string;
// }

const postCheckoutOrder = async checkoutData => {
  const { data } = await axios.post(`/api/orders`, checkoutData);
  return data;
};

export { postCheckoutOrder };
