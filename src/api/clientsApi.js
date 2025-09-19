
import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const { VITE_API_URL1, VITE_API_URL2 } = getEnvVariables();

const clientsApi = axios.create({
    baseURL: 'http://localhost:4001'
    //baseURL: 'https://starfactorysevillaadmin.com/api'

    //baseURL: VITE_API_URL1

});

//* todo: configurar interceptores // Se pide el token en cada petición de ruta
clientsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['x-token'] = token;
  return config;
});


export default clientsApi;
