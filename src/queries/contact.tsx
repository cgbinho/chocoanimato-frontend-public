import axios from '../services/api';

interface IQueryData {
  name: string;
  email: string;
  message: string;
}

const postMessage = async ({ name, email, message }: IQueryData) => {
  const { data } = await axios.post(`/api/contact`, { name, email, message });
  return data;
};

export { postMessage };
