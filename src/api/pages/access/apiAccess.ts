import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

// получить данные страницы контента по абитуриентскому боту
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
