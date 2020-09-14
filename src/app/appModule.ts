import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { IAppConfig } from "@/config/IAppConfig";
import { store } from "@/store";
export interface IAppState {
  locale: string;
  config: IAppConfig;
  defaultMessages: any;
  redirectTo: string;
  cookieConsentVersion: string;
}
@Module({ name: "app", dynamic: true, namespaced: true, store })
export default class App extends VuexModule<ThisType<IAppState>> {
  locale?: string = "en";
  config?: IAppConfig;
  defaultMessages: any;
  redirectTo?: string;
  cookieConsentVersion?: string = "";

  @Action
  public changeLocale(locale: string) {
    this.CHANGE_LOCALE(locale);
  }
  @Action
  setCookieConsentVersion(version: string) {
    this.SET_COOKIE_CONSENT_VERSION(version);
  }
  @Mutation
  CHANGE_LOCALE(locale: string) {
    this.locale = locale;
  }
  @Mutation
  SET_COOKIE_CONSENT_VERSION(version: string) {
    this.cookieConsentVersion = version;
  }
}
export const AppModule = getModule(App);
