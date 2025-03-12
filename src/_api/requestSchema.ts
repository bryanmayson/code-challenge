import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiFunc<T, R> = (params: T) => Promise<R>;

interface ApiParamsStruct<P extends object, D extends object> {
  url: string;
  params?: P;
  data?: D;
  options?: AxiosRequestConfig;
}

const validateStatus = (statusCode: number): boolean => {
  if (statusCode >= 200 && statusCode < 300) {
    if (statusCode === 204) return false;
    return true;
  }
  return false;
};

const jsonReqHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const postJson = async <
  DataStruct extends object,
  RequestStruct extends object,
>({
  url,
  data,
  options = {},
}: ApiParamsStruct<RequestStruct, DataStruct>) => {
  const requestConfig: AxiosRequestConfig = {
    ...options,
    headers: {
      ...jsonReqHeaders,
    },
    validateStatus,
  };
  const response: AxiosResponse = await axios.post(url, data, requestConfig);
  return response;
};
