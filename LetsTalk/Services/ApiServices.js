import Axios from 'axios';
// export const BASE_API_URL = `http://localhost:8001`
export const BASE_API_URL = `http://192.168.1.24:8001`
// export const BASE_API_URL = `http://10.0.2.2:8001`;

const AxiosInstance = Axios.create({
  baseURL: BASE_API_URL, // Your API base URL
});
// Add a request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    // console.error('Axios Error:', error);
    return Promise.reject(error);
  },
);

export default AxiosInstance;
