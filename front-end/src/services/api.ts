import axios, { AxiosError, AxiosResponse } from 'axios';
import { Video, Category } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleError = (error: AxiosError) => {
  if (error.response) {
    throw new Error(`Server error: ${error.response.status}`);
  } else if (error.request) {
    throw new Error('Network error: Unable to reach the server');
  } else {
    throw new Error('Error setting up the request');
  }
};

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response: AxiosResponse<Video[]> = await api.get('/videos');
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    return [];
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await api.get('/categories');
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    return [];
  }
};

export const fetchVideoById = async (id: string): Promise<Video> => {
  try {
    const response: AxiosResponse<Video> = await api.get(`/videos/${id}`);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export default api;