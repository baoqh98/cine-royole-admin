import axios, { AxiosError } from 'axios';
import { store } from '../store';

export const axiosClient = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api/',
  headers: {
    TokenCyberSoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NjAzMjAwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNjk2MTc5NjAwfQ.i6JqYnGkwyHl6dkDHnjFWbPfBEl2l4SXAp4r7h9Ecpw',
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error: AxiosError) => {
    return Promise.reject((error.response?.data as any).content);
  }
);

axiosClient.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.data?.accessToken;
  config.headers!.Authorization = `Bearer ${accessToken}`;
  return config;
});
