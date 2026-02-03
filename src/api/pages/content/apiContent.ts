import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

// получить данные страницы контента по абитуриентскому боту
export const getContentAbit = async (): Promise<any> => {
  try {
    const response = await api.get('/api/bot-texts/abit')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// получить данные страницы контента по техническому боту
export const getContentAdmin = async (): Promise<any> => {
  try {
    const response = await api.get('/api/bot-texts/admin')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// изменить текст абитуриентского бота
export const changeTextContentAbit = async (text: string, key: string): Promise<any> => {
  try {
    const request  = { value: text };
    const response: AxiosResponse = await api.patch(`/api/bot-texts/abit/${key}`, request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// изменить текст технического бота
export const changeTextContentAdmin = async (text: string, key: string): Promise<any> => {
  try {
    const request  = { value: text };
    const response: AxiosResponse = await api.patch(`/api/bot-texts/admin/${key}`, request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};
