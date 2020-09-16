<template>
  <div :class="$style.vueNavBar" ref="nav">
    <div>
      <slot name="left" />
    </div>
    <div>
      <slot name="middle" />
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "VueNavBar"
})
export default class VueNavBar extends Vue {}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueNavBar {
  width: $nav-bar-width;
  min-height: $nav-bar-height;
  color: $nav-bar-color;
  padding: $nav-bar-padding;
  z-index: $nav-bar-index;
  position: fixed;
  top: 0;
  left: 0;
  //background: $nav-bar-bg;
  @include background-gradient-deg(
    30deg,
    palette-color-level("coral", 40),
    palette-color-level("blue", 40)
  );
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;

  div {
    flex: 0 0 33.333333%;
    align-content: center;
    justify-content: center;
    display: flex;

    &:last-child {
      justify-content: flex-end;
    }
  }
}
</style>
