import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

// получить данные ролей
export const getContentAccessAdmins = async (): Promise<any> => {
  try {
    const response = await api.get('/api/bot-admins/admins')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// создать админа
export const createAccessAdmin = async (name: string, phone: string, role: string): Promise<any> => {
  try {
    const request  = { name, phone, role };
    const response: AxiosResponse = await api.post('/api/bot-admins/admin', request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// удалить админа
export const deleteContentAccessAdmin = async (number: string): Promise<any> => {
  try {
    const response = await api.delete(`/api/bot-admins/admin/${number}`)
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// получить данные админов админки
export const getAccessAdminsAdminPanel = async (): Promise<any> => {
  try {
    const response = await api.get('/api/admin-users/admins')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// получить все токены 
export const getAccessTokens = async (): Promise<any> => {
  try {
    const response = await api.get('/api/token/tokens')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};