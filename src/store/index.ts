import Vue from "vue";
import Vuex, { Module, Store } from "vuex";
import VuexPersistence from "vuex-persist";
import { IAppState } from "@/app/appModule";
import { IAuthState } from "@/shared/modules/auth/authModule"; //https://github.com/championswimmer/vuex-persist

Vue.use(Vuex);
const VuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  asyncStorage: false,
  modules: ["app"]
});
export const store = new Vuex.Store({
  plugins: [VuexLocal.plugin]
}) as Store<IState>;
export interface IState {
  [key: string]: any;
  app: IAppState;
  auth: IAuthState;
}
