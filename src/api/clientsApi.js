
import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const {VITE_API_URL} = getEnvVariables();

const clientsApi = axios.create({
    baseURL: 'http://localhost:4001/api'
    //baseURL: VITE_API_URL
  });


  export default clientsApi;