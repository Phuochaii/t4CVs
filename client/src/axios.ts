//Axios libray
import axios from 'axios';
//Base URL from .env
const REACT_APP_SERVER_URL = 'http://localhost:3000';

export const instance = axios.create({
  //Base URL of entire project
  baseURL: `${REACT_APP_SERVER_URL}`,
});
