import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

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
