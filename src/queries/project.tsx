import axios from '../services/api';

interface FormData {
  [x: string]: string | File;
}

const updateProject = async (projectFormData: FormData) => {
  const { id, ...rawformData } = projectFormData;

  const formData = await formatMultiPartData(rawformData);

  const { data } = await axios.put(`/api/projects/${id}`, formData);
  return data;
};

const fetchProject = async (id: string) => {
  const { data } = await axios.get(`/api/projects/${id}`);
  return data;
};

export { fetchProject, updateProject };

// Format MultiPartFormData to upload files and json data:
async function formatMultiPartData(rawformData) {
  let formDataFormatted = new FormData();

  for (const key in rawformData) {
    formDataFormatted.append(key, rawformData[key]);
  }

  return formDataFormatted;
}
