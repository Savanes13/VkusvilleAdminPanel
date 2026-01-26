import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

export const getContentInterviewsPage = async (): Promise<any> => {
  try {
    const response = await api.get('/api/interview/get-all')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};
