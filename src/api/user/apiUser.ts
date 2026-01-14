import axios, { AxiosError, type AxiosResponse } from "axios"; // ← Добавили импорт axios
import api from "../axios";

// авторизация
export const auth = async (username: string, password: string): Promise<any> => {
  // надо токен класть через куки а не в локальное хранилще
  try {
    const request  = { username, password };
    const response: AxiosResponse = await api.post('/api/auth/login', request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// регистрация

// обновление токена
export const refreshAccessToken = async (): Promise<{ access_token: string }> => {
  try {
    const response: AxiosResponse<{ access_token: string }> = await api.post('/api/auth/refresh')
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response
    }
    throw new Error('An unknown error')
  }
}

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

