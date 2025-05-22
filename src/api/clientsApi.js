
import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const {VITE_API_URL} = getEnvVariables();

const clientsApi = axios.create({
    //baseURL: 'https://starfactory-back-production.up.railway.app/api'
    baseURL: 'http://localhost:4001'
   // baseURL: 'https://starfactory-back.vercel.app'
  });


  export default clientsApi;