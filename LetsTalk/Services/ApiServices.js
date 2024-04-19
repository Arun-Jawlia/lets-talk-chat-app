import Axios from 'axios'
export const BASE_API_URL = `http://localhost:8001`
// export const BASE_API_URL = `http://192.168.1.1:8001`

const AxiosInstance = Axios.create({
    baseURL: BASE_API_URL, // Your API base URL
  });
// Add a request interceptor
AxiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sentr
      console.log('Request Interceptor:', config);
      return config;
    },
    function (error) {
    // Do something with request error
      return Promise.reject(error);
    }
  );

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Axios Error:', error);
      return Promise.reject(error);
    }
  );

  export default AxiosInstance;
