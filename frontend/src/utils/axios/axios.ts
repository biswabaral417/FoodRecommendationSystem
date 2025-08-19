import axios from 'axios';

const instance = axios.create({
  baseURL: "https://foodrecommendationsystem.onrender.com/api",
  withCredentials: true,
});

export default instance;
