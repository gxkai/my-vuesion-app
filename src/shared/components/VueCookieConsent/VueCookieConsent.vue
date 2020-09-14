<template>
  <fade-animation>
    <div :class="$style.vueCookieConsent" v-if="show" ref="cookieConsent">
      <div :class="$style.content"><slot /></div>

      <div
        role="button"
        tabindex="0"
        :aria-label="$t('components.cookieConsent.accept' /* Accept */)"
        :class="$style.button"
        @click="onConsent"
      >
        <div :class="$style.icon"><vue-icon-times /></div>
      </div>
    </div>
  </fade-animation>
</template>

<script lang="ts">
import FadeAnimation from "../../animations/FadeAnimation/FadeAnimation.vue";
import VueIconTimes from "../icons/VueIconTimes/VueIconTimes.vue";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueCookieConsent",
  components: { FadeAnimation, VueIconTimes }
})
export default class VueCookieConsent extends Vue {
  @Prop({
    type: String,
    required: true
  })
  currentVersion!: string;
  @Prop({
    type: String,
    required: true
  })
  cookieConsentVersion!: string;
  @Prop({
    type: Function,
    required: true
  })
  setCookieConsentVersion!: (args: any) => void;
  get show() {
    return this.currentVersion !== this.cookieConsentVersion;
  }
  onConsent() {
    this.setCookieConsentVersion(this.currentVersion);
  }
  addBodyPadding() {
    document.body.style.paddingBottom = `${
      (this.$refs.cookieConsent as any).getBoundingClientRect().height
    }px`;
  }
  removeBodyPadding() {
    document.body.style.paddingBottom = `0px`;
  }
  mounted() {
    if (this.show) {
      this.addBodyPadding();
    }
  }
  @Watch("show")
  $$show(show: boolean) {
    if (!show) {
      this.removeBodyPadding();
    }
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueCookieConsent {
  position: fixed;
  display: flex;
  flex-direction: row;
  z-index: $nav-bar-index;
  background-color: $card-bg;
  width: 100%;
  bottom: 0;
  transition: opacity $brand-transition-duration ease-in-out;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.3);
}

.content {
  flex: 1;
  padding: $space-12;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 $space-52;
  background: $brand-secondary;
  cursor: pointer;
  color: foreground-color($brand-secondary);

  &:hover {
    background-color: darken($brand-secondary, 5%);
  }
}

.icon {
  flex: 1;
  text-align: center;
}
</style>
