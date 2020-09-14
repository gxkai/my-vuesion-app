import Vue from "vue";
import VueI18n from "vue-i18n";
import VeeValidate from "vee-validate";
import { Store } from "vuex";
// @ts-ignore
import { sync } from "vuex-router-sync";
import { VueRouter } from "vue-router/types/router";
import App from "./app/App/App.vue";
import { IState, store } from "./store";
import { router } from "./router";
import { i18n } from "@/shared/plugins/i18n/i18n";
import { HttpService } from "@/shared/services/HttpService/HttpService";

// @ts-ignore
Vue.use(VeeValidate, { inject: false, delay: 1 });

export interface IApp {
  app: Vue;
  router: VueRouter;
  store: Store<IState>;
  i18n: VueI18n;
}

export const createApp = (): IApp => {
  sync(store, router);

  HttpService.store = store;

  const app: Vue = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  });
  app.$mount("#app");
  return { app, router, store, i18n };
};

const AppMain: IApp = createApp();
export default AppMain;
