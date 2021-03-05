import { usePaginatedQuery, useQuery } from 'react-query';
import axios from '../services/api';
import appConfig from '../config/app';

interface IDownloadQuery {
  id: string;
}

const fetchDownload = async (id: string) => {
  const response = await axios.get(`assets/videos/delivery/${id}`, {
    responseType: 'blob'
  });

  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', getFilenameFromHeader(response)); //any other extension
  document.body.appendChild(link);
  link.click();
  link.remove();
  return true;
};

const useDownload = (id: string) => {
  return useQuery<any, Error>(id, fetchDownload);
};

export { useDownload, fetchDownload };

function getFilenameFromHeader(response) {
  // content-disposition para pegar o nome do arquivo:
  let headerLine = response.headers['content-disposition'];
  let startFileNameIndex = headerLine.indexOf('"') + 1;
  let endFileNameIndex = headerLine.lastIndexOf('"');
  let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
  return filename;
}
