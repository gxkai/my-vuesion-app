import Vue from "vue";
import VueRouter, { Route, RouteRecord } from "vue-router";
// @ts-ignore
import Meta from "vue-meta";
import { AppRoutes } from "@/app/routes";
import { store } from "@/store";
import { HomeRoutes } from "@/views/home/routes";
import { DashboardRoutes } from "@/views/dashboard/routes";

Vue.use(VueRouter);
Vue.use(Meta);

export const router: VueRouter = new VueRouter({
  mode: "hash",
  routes: [...AppRoutes, ...HomeRoutes, ...DashboardRoutes]
});

// example guard
// TODO remove or adjust in production code
router.beforeEach((to: Route, from: Route, next: any) => {
  if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters["auth/isAuthenticated"];

    if (!isAuthenticated) {
      next({ path: "/", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});
