import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

// получить данные страницы контента
export const getContent = async (): Promise<any> => {
  try {
    const response = await api.get('/api/bot-texts/abit?limit=100&offset=0')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// изменить текст 

// TODO: НАДО РАЗДЕЛЕНИЕ НА ДВУХ БОТОВ
export const changeTextContent = async (text: string, key: string): Promise<any> => {
  try {
    const request  = { value: text };
    const response: AxiosResponse = await api.patch(`/api/bot-texts/abit/${key}`, request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};
