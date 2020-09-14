<template>
  <div :class="$style.grid"><slot /></div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueGrid"
})
export default class VueGrid extends Vue {}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.grid {
  max-width: 425px;
  margin: 0 auto;
  position: relative;
  padding: 0 $screen-phone-gutter * 0.5;

  @include mediaMin(tabletPortrait) {
    max-width: $screen-tablet-portrait;
    padding: 0 $screen-tablet-portrait-gutter * 0.5;
  }

  @include mediaMin(tabletLandscape) {
    max-width: $screen-tablet-landscape;
    padding: 0 $screen-tablet-landscape-gutter * 0.5;
  }

  @include mediaMin(smallDesktop) {
    max-width: $screen-small-desktop;
    padding: 0 $screen-small-desktop-gutter * 0.5;
  }

  @include mediaMin(largeDesktop) {
    max-width: $screen-large-desktop;
    padding: 0 $screen-large-desktop-gutter * 0.5;
  }
}
</style>
