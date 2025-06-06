
import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const {VITE_API_URL} = getEnvVariables();

const clientsApi = axios.create({
    baseURL: 'http://localhost:4001'
  //baseURL: 'http://161.97.121.100/api'
  });


  export default clientsApi;