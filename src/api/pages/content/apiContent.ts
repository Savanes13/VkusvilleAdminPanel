import axios, { AxiosError, type AxiosResponse } from "axios";

export const getContext = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get("https://ajasdc-test.vv-rea.management/api/context");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response;
    }
    throw new Error("An unknown error");
  }
};
