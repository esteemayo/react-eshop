import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

// axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred!');
  }

  return Promise.reject(error);
});

const setJWT = (accessToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

const http = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setJWT,
};

export default http;
