import axios from 'axios';
import { cookies } from 'next/headers';
import { authTokenKey, baseUrl } from './constants';




const axiosServices = axios.create({ withCredentials: true, baseURL: baseUrl })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  (config) => {
    const token = cookies().get(authTokenKey)?.value

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  }
);




export default axiosServices;