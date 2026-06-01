import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

// получить данные страницы абитуриентов
export const getApplicantsPage = async (): Promise<any> => {
  try {
    const response = await api.get('/api/abit/users')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// скачать статистику по абитуриентам
export const downloadStatisticsApplicantsPage = async (): Promise<Blob> => {
  try {
    const response = await api.get('/api/abit/users/grades.csv', {
      responseType: 'blob',
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};