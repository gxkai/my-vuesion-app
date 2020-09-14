import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { store } from "@/store";
import { HttpService } from "@/shared/services/HttpService/HttpService";
const getFormData = (username: string, password: string) =>
  `grant_type=password&username=${encodeURIComponent(
    username
  )}&password=${encodeURIComponent(password)}`;
export interface IAuthState {
  accessToken?: string;
  refreshToken?: string;
}
export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
}
@Module({ name: "auth", dynamic: true, namespaced: true, store })
export default class Auth extends VuexModule<ThisType<IAuthState>> {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  get isAuthenticated(): boolean {
    return this.accessToken !== null;
  }
  @Mutation
  SET_ACCESS_TOKEN(accessToken) {
    this.accessToken = accessToken;
  }
  @Mutation
  SET_REFRESH_TOKEN(refreshToken) {
    this.refreshToken = refreshToken;
  }
  @Action
  async createToken({ username, password }) {
    try {
      const {
        data: { access_token, refresh_token }
      } = await HttpService.post<IAuthResponse>(
        "/token",
        getFormData(username, password),
        {
          headers: {
            Authorization: "Basic Zm9vYmFy",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      this.SET_ACCESS_TOKEN(access_token);
      this.SET_REFRESH_TOKEN(refresh_token);
    } catch (e) {
      this.SET_ACCESS_TOKEN(undefined);
      this.SET_REFRESH_TOKEN(undefined);
      throw new Error(e);
    }
  }
  @Action
  async refreshTokenAction({ refreshToken }) {
    try {
      const {
        data: { access_token, refresh_token }
      } = await HttpService.post<IAuthResponse>(
        "/token",
        `grant_type=refresh_token&refresh_token=${refreshToken}`,
        {
          headers: {
            Authorization: "Basic Zm9vYmFy",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      this.SET_ACCESS_TOKEN(access_token);
      this.SET_REFRESH_TOKEN(refresh_token);
    } catch (e) {
      this.SET_ACCESS_TOKEN(null);
      this.SET_REFRESH_TOKEN(null);
      throw new Error(e);
    }
  }
  @Action
  async revokeToken() {
    try {
      await HttpService.delete("/token");
      this.SET_ACCESS_TOKEN(null);
      this.SET_REFRESH_TOKEN(null);
    } catch (e) {
      this.SET_ACCESS_TOKEN(null);
      this.SET_REFRESH_TOKEN(null);
    }
  }
}
export const AuthModule = getModule(Auth);
