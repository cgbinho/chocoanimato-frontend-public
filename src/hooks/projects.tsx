import { useQuery } from 'react-query';
import axios from '../services/api';

interface IQuery {
  page: number;
}

const fetchProjects = async ({ page }: IQuery) => {
  const { data } = await axios.get(`/api/projects`, { params: { page } });
  return data;
};

const useProjects = ({ page }: IQuery) => {
  return useQuery<any, Error>(['projects', { page }], fetchProjects);
};

const fetchProjectAsset = async (project: { id: string; filename: string }) => {
  const { id, filename } = project;

  const { data } = await axios.get(`/assets/images/${id}/${filename}`, {
    responseType: 'blob'
  });

  const currentImage = window.URL.createObjectURL(new Blob([data]));

  return currentImage;
};

const useProjectAsset = (project: { id: string; filename: string }) => {
  return useQuery<any, Error>([project], fetchProjectAsset);
};

const createProject = async ({ id }) => {
  const { data } = await axios.post(`/api/projects`, { template_id: id });
  return data;
};

const deleteProject = async ({ id }) => {
  const { data } = await axios.delete(`/api/projects/${id}`);
  return data;
};

const useDeleteProject = ({ id }) => {
  return useQuery<any, Error>([{ id }], deleteProject);
};

export {
  useProjects,
  fetchProjects,
  createProject,
  fetchProjectAsset,
  useProjectAsset,
  useDeleteProject,
  deleteProject
};
