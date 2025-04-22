import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',  // Altere para a URL do seu backend
  timeout: 10000,  // Timeout de 10 segundos, ajuste conforme necessário
});

export default api;
