<template>
  <transition
    :enter-class="$style.enter"
    :enter-active-class="$style.enterActive"
    :enter-to-class="$style.enterTo"
    :leave-class="$style.leave"
    :leave-active-class="$style.leaveActive"
    :leave-to-class="$style.leaveTo"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Inject,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";
@Component({
  name: "FadeAnimation"
})
export default class FadeAnimation extends Vue {}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.enterActive,
.leaveActive {
  transition: $brand-fade-animation-transition;
}

.enterTo,
.leave {
  opacity: 1;
}

.enter,
.leaveTo {
  opacity: 0;
}
</style>
