<template>
  <div id="app" :class="$style.app">
    <vue-notification-stack />

    <vue-navigation-progress :is-navigating="isNavigating" />

    <vue-nav-bar>
      <vue-button
        slot="right"
        v-if="isAuthenticated === false"
        color="primary"
        @click="showLoginModal = true"
      >
        Login
      </vue-button>

      <vue-button
        slot="right"
        v-if="isAuthenticated"
        color="primary"
        @click="onLogout"
      >
        Logout
      </vue-button>
    </vue-nav-bar>

    <router-view :class="$style.content" />

    <vue-footer />

    <vue-sidebar>
      <vue-sidebar-group title="Languages">
        <vue-sidebar-group-item>
          <vue-select
            name="lang"
            id="lang"
            :options="languages"
            @input="localeSwitch"
            :value="locale"
          />
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="Navigation">
        <vue-sidebar-group-item to="/">
          <vue-icon-code />
          Home
        </vue-sidebar-group-item>

        <vue-sidebar-group-item :to="{ name: 'dashboard' }">
          <vue-icon-hashtag />
          Dashboard
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="Documentation"> </vue-sidebar-group>

      <vue-sidebar-group title="Community"> </vue-sidebar-group>
    </vue-sidebar>

    <vue-modal :show="showLoginModal" @close="showLoginModal = false">
      <login-form :loading="isLoginPending" @submit="onLoginSubmit" />
    </vue-modal>
  </div>
</template>

<script lang="ts">
import { loadLocaleAsync } from "@/shared/plugins/i18n/i18n";
import "@/shared/designSystem/global.scss";
import VueNavBar from "@/shared/components/VueNavBar/VueNavBar.vue";
import VueGrid from "@/shared/components/VueGrid/VueGrid.vue";
import VueGridItem from "@/shared/components/VueGridItem/VueGridItem.vue";
import VueFooter from "@/shared/components/VueFooter/VueFooter.vue";
import VueNotificationStack from "@/shared/components/VueNotificationStack/VueNotificationStack.vue";
import VueCookieConsent from "@/shared/components/VueCookieConsent/VueCookieConsent.vue";
import VueNavigationProgress from "@/shared/components/VueNavigationProgress/VueNavigationProgress.vue";
import VueSidebar from "@/shared/components/VueSidebar/VueSidebar.vue";
import VueSidebarGroup from "@/shared/components/VueSidebar/VueSidebarGroup/VueSidebarGroup.vue";
import VueSidebarGroupItem from "@/shared/components/VueSidebar/VueSidebarGroupItem/VueSidebarGroupItem.vue";
import VueIconCode from "@/shared/components/icons/VueIconCode/VueIconCode.vue";
import VueIconBook from "@/shared/components/icons/VueIconBook/VueIconBook.vue";
import VueIconHashtag from "@/shared/components/icons/VueIconHashtag/VueIconHashtag.vue";
import VueIconGithub from "@/shared/components/icons/VueIconGithub/VueIconGithub.vue";
import VueIconTwitterSquare from "@/shared/components/icons/VueIconTwitterSquare/VueIconTwitterSquare.vue";
import VueSelect from "@/shared/components/VueSelect/VueSelect.vue";
import VueIconPuzzlePiece from "@/shared/components/icons/VueIconPuzzlePiece/VueIconPuzzlePiece.vue";
import VueButton from "@/shared/components/VueButton/VueButton.vue";
import VueModal from "@/shared/components/VueModal/VueModal.vue";
import { addNotification } from "@/shared/components/VueNotificationStack/utils";
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/app/appModule";
import { AuthModule } from "@/shared/modules/auth/authModule";
import LoginForm from "@/shared/modules/auth/LoginForm/LoginForm.vue";

@Component({
  name: "App",
  components: {
    LoginForm,
    VueModal,
    VueButton,
    VueIconPuzzlePiece,
    VueSelect,
    VueIconTwitterSquare,
    VueIconGithub,
    VueIconHashtag,
    VueIconBook,
    VueIconCode,
    VueSidebarGroupItem,
    VueSidebarGroup,
    VueSidebar,
    VueNavigationProgress,
    VueCookieConsent,
    VueNavBar,
    VueGrid,
    VueGridItem,
    VueFooter,
    VueNotificationStack
  }
})
export default class App extends Vue {
  isNavigating = false;
  languages = [
    { label: "English", value: "en" },
    { label: "Deutsch", value: "de" },
    { label: "Português", value: "pt" },
    { label: "中文", value: "zh-cn" }
  ];
  showLoginModal = false;
  isLoginPending = false;

  get cookieConsentVersion() {
    return AppModule.cookieConsentVersion;
  }
  get locale() {
    return AppModule.locale;
  }
  get isAuthenticated() {
    return AuthModule.isAuthenticated;
  }
  setCookieConsentVersion(version: string) {
    AppModule.setCookieConsentVersion(version);
  }
  changeLocale(locale: string) {
    AppModule.changeLocale(locale);
  }
  createToken({ username, password }) {
    AuthModule.createToken({ username, password });
  }
  revokeToken() {
    AuthModule.revokeToken();
  }
  localeSwitch(locale: string) {
    loadLocaleAsync(locale).catch((error: Error) => console.log(error)); // tslint:disable-line

    this.changeLocale(locale);
  }
  initProgressBar() {
    this.$router.beforeEach((to: any, from: any, next: any) => {
      this.isNavigating = true;
      next();
    });
    this.$router.afterEach(() => {
      this.isNavigating = false;
    });
  }
  async onLoginSubmit(formData: any) {
    this.isLoginPending = true;

    try {
      await this.createToken(formData);

      await this.$router.push({ name: "dashboard" });
    } catch (e) {
      addNotification({
        title: "Error during login",
        text: "Please try again!"
      });
    }

    this.isLoginPending = false;
    this.showLoginModal = false;
  }
  async onLogout() {
    this.isLoginPending = true;

    await this.revokeToken();

    await this.$router.push("/");

    this.isLoginPending = false;
    this.showLoginModal = false;
  }
  created() {
    this.initProgressBar();
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";
@import "~@/shared/designSystem/reset";
@import "~@/shared/designSystem/typo";

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.logo {
  position: relative;
  top: $space-4;
  width: $space-24;
  height: $space-24;
}
</style>
