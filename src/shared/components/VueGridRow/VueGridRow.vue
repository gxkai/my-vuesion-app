<template>
  <div :class="$style.vueGridRow"><slot /></div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueGridRow"
})
export default class VueGridRow extends Vue {}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueGridRow {
  display: flex;
  flex-wrap: wrap;
  margin: 0 ($screen-phone-gutter * -0.5);

  @include mediaMin(tabletPortrait) {
    margin: 0 ($screen-tablet-portrait-gutter * -0.5);
  }

  @include mediaMin(tabletLandscape) {
    margin: 0 ($screen-tablet-landscape-gutter * -0.5);
  }

  @include mediaMin(smallDesktop) {
    margin: 0 ($screen-small-desktop-gutter * -0.5);
  }

  @include mediaMin(largeDesktop) {
    margin: 0 ($screen-large-desktop-gutter * -0.5);
  }
}
</style>
