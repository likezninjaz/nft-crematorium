import { AxiosRequestConfig } from 'axios';

interface CancelablePromise<T> extends Promise<T> {
  cancel?: () => void;
}

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): CancelablePromise<T>;
    get<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): CancelablePromise<T>;
    delete<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): CancelablePromise<T>;
    head<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): CancelablePromise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): CancelablePromise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): CancelablePromise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): CancelablePromise<T>;
  }
}
