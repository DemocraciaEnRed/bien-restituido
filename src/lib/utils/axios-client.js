import axios from 'axios';
import { authTokenKey, baseUrl } from './constants';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';



const axiosClientServices = axios.create({ withCredentials: true, baseURL: baseUrl })
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosClientServices.interceptors.request.use(
  (config) => {
    const token = getCookie(authTokenKey)

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  }
);




export default axiosClientServices;