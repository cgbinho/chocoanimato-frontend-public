import axios from '../services/api';

interface IQueryData {
  email: string;
  password: string;
}

const postSignIn = async ({ email, password }: IQueryData) => {
  const { data } = await axios.post(`/api/sessions`, { email, password });
  return data;
};

export { postSignIn };
