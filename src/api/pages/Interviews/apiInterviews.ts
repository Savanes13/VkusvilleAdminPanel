import axios, { AxiosError, type AxiosResponse } from "axios";
import api from "@/api/axios";

export const getContentInterviewsPage = async (id: number): Promise<any> => {
  try {
    const response = await api.get(`/api/interview/get-all?offset_week=${id}`)
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// получить всех экспертов для собеседование
export const getExpertsForInterview = async (): Promise<any> => {
  try {
    const response = await api.get('/api/experts/data-all')
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// получить эксперта по id
export const getExpertsForId = async (ex_id: number): Promise<any> => {
  try {
    const response = await api.get(`/api/experts/data/${ex_id}`)
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};

// добавить эксперта в собеседование
export const addExpertToInterview = async (interview_id: number, experts: number[]): Promise<any> => {
  try {
    const request  = { interview_id, experts};
    const response: AxiosResponse = await api.put(`/api/interview/reviewer`, request);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) throw error.response;
    throw new Error('An unknown error');
  }
};