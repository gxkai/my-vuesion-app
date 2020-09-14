<template>
  <form :class="$style.loginForm" @submit.stop.prevent="onSubmit">
    <vue-headline level="3">{{
      $t("auth.LoginForm.title" /* Login Example */)
    }}</vue-headline>

    <br />

    <vue-input
      id="username"
      name="username"
      type="text"
      autofocus
      :label="$t('common.username' /* Username */)"
      :placeholder="$t('common.username.placeholder' /* Enter any username */)"
      validation="required"
      :error-message="
        $t('auth.LoginForm.username.error' /* The username can not be empty */)
      "
      v-model="username"
    />

    <vue-input
      id="password"
      name="password"
      type="password"
      :label="$t('common.password' /* Password */)"
      :placeholder="$t('common.password.placeholder' /* Enter any password */)"
      validation="required|min:6"
      :error-message="
        $t(
          'auth.LoginForm.password.error' /* The password has to have at least 6 characters */
        )
      "
      v-model="password"
    />

    <vue-button
      color="primary"
      tabindex="3"
      type="submit"
      :disabled="isSubmitDisabled"
      :loading="loading"
    >
      {{ $t("auth.LoginForm.cta" /* Login */) }}
    </vue-button>
  </form>
</template>

<script lang="ts">
import VueHeadline from "@/shared/components/VueHeadline/VueHeadline.vue";
import VueInput from "@/shared/components/VueInput/VueInput.vue";
import VueButton from "@/shared/components/VueButton/VueButton.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "LoginForm",
  components: { VueButton, VueInput, VueHeadline },
  $_veeValidate: {
    validator: "new" as "new"
  }
})
export default class LoginForm extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  loading!: boolean;
  username = "";
  password = "";
  get hasErrors() {
    // return this.errors && this.errors.items.length > 0;
    return false;
  }
  get hasEmptyFields() {
    return this.username.trim() === "" || this.password.trim() === "";
  }
  get isSubmitDisabled() {
    return this.hasErrors || this.hasEmptyFields;
  }
  onSubmit() {
    this.$emit("submit", this.$data);
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.loginForm {
  display: block;

  @include mediaMin(tabletPortrait) {
    min-width: 512px;
  }
}
</style>
