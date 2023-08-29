import axios from 'axios';

export const $publicApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
