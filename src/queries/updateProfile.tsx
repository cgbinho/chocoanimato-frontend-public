import axios from '../services/api';

interface IQueryData {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  password_confirmation?: string;
}

const updateProfile = async ({
  name,
  email,
  password,
  old_password,
  password_confirmation
}: IQueryData) => {
  const { data } = await axios.put(`/api/profile`, {
    name,
    email,
    password,
    old_password,
    password_confirmation
  });
  return data;
};

export { updateProfile };
