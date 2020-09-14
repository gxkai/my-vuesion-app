import { HttpService } from "./HttpService";
import { AxiosRequestConfig, AxiosError } from "axios";
import { Store } from "vuex";
import { IState } from "@/store";

export function setupRequestInterceptor() {
  HttpService.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token: string | undefined = (<Store<IState>>HttpService.store).state
        .auth.accessToken;
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      };
    },
    /* istanbul ignore next */
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}
