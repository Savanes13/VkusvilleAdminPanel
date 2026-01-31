import axios, { AxiosError, type AxiosResponse } from "axios"; // ← Добавили импорт axios
import api from "../axios";

// авторизация
export const auth = async (username: string, password: string): Promise<any> => {
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
export const register = async (display_name: string, email: string, password: string, invite_token: string): Promise<any> => {
  try {
    const request  = { display_name, email, password, invite_token };
    const response: AxiosResponse = await api.post('/api/auth/register', request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// выйти из аккаунта
export const logout = async (): Promise<any> => {
  try {
    const response = await api.post('/api/auth/logout')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

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
