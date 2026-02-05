import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

// получить данные страницы абитуриента
export const getApplicantPage = async (userId: number, stageId: number): Promise<any> => {
  try {
    const response = await api.get(`/api/abit/grade?abit_id=${userId}&task_id=${stageId}`)
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// перевести на следующий этап
export const moveToNextStage = async (abit_id: number): Promise<any> => {
  try {
    const request  = { abit_id };
    const response: AxiosResponse = await api.post(`/api/abit/next_stage`, request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// дать больше времнеи для работы
export const giveMoreDaysForWork = async (abit_id: number, extend_time: number): Promise<any> => {
  try {
    const request  = { abit_id, extend_time };
    const response: AxiosResponse = await api.post(`/api/abit/extend_stage_time`, request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// поменять данные 
export const pathApplicantScores = async (obj: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.patch(`/api/abit/grade`, obj);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};