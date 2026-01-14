import axios, { AxiosError, type AxiosResponse } from "axios"; // ← Добавили импорт axios
import api from "../axios";

// авторизация
export const auth = async (username: string, password: string): Promise<any> => {
  try {
    const request  = { username, password };
    const response: AxiosResponse = await axios.post('https://ajasdc-test.vv-rea.management/api/auth/login', request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// регистрация

// обновление токена
export const refreshAccessToken = async (token: string): Promise<any> => {
  try {
    const request = { refresh_token: token };
    const response: AxiosResponse = await axios.post('https://ajasdc-test.vv-rea.management/api/auth/refresh', request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// проверка авторизации
export const checkAuth = async (): Promise<any> => {
  try {
    const response = await api.get('/api/auth/me')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

