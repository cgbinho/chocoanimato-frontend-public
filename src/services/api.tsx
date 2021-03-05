import axios from 'axios';
import appConfig from '../config/app';

// axios.defaults.headers.Authorization = token ? `Bearer ${token}` : '';

const baseURL =
  appConfig.node_env === 'production'
    ? `https://www.chocoanimato.com/backend`
    : `http://localhost:${appConfig.api_port}/backend`;

export default axios.create({ baseURL });
