<template>
  <div
    :class="[$style.vueNavigationProgress, show ? $style.show : '']"
    :style="{ width: `${percent}%`, transition: transitionStyle }"
  ></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getIntInRange } from "@/shared/utils/randomGenerator.util";

@Component({
  name: "VueNavigationProgress"
})
export default class VueNavigationProgress extends Vue {
  @Prop({
    type: Boolean,
    required: true
  })
  isNavigating!: boolean;
  widthTransitionDuration = 500;
  opacityTransitionDuration = 350;
  interval: any = null;
  percent = 0;
  show = false;
  startAnimation() {
    this.interval = setInterval(() => {
      this.show = true;
      if (this.percent <= 50) {
        this.percent += getIntInRange(30, 40);
      } /* istanbul ignore next */ else if (this.percent <= 70) {
        this.percent += getIntInRange(5, 10);
      } /* istanbul ignore next */ else if (this.percent <= 95) {
        this.percent += getIntInRange(1, 2);
      } else {
        this.percent = 99;
      }
    }, 100);
  }
  stopAnimation() {
    clearInterval(this.interval);
    this.interval = null;
    this.percent = 100;
    setTimeout(() => {
      this.show = false;
      setTimeout(() => {
        this.percent = 0;
      }, this.opacityTransitionDuration);
    }, this.widthTransitionDuration);
  }
  get transitionStyle() {
    return `width ${this.widthTransitionDuration}ms linear, opacity ${this.opacityTransitionDuration}ms`;
  }
  @Watch("isNavigating", { immediate: true })
  $$isNavigating(isNavigating: boolean) {
    if (isNavigating) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueNavigationProgress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 2px;
  @include background-gradient(
    $brand-secondary,
    lighten($brand-secondary, 30%),
    "horizontal"
  );
  opacity: 0;
}

.show {
  opacity: 1;
}
</style>
