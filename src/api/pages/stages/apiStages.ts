import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";
import type { IStage } from "@/types/pages/stages/typesStages";

export const getContenStagesPage = async (): Promise<any> => {
  try {
    const response = await api.get('/api/abit_task/task')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

//препатч 
export const prepatchDataStage = async (id: number, obj: IStage): Promise<any> => {
  try {
    const response: AxiosResponse = await api.patch(`/api/abit_task/task/pre_patch/${id} `, obj);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};

// изменить настройки этапа
export const changeDataStage = async (id: number, obj: IStage): Promise<any> => {
  try {
    const response: AxiosResponse = await api.patch(`/api/abit_task/task/${id} `, obj);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};
