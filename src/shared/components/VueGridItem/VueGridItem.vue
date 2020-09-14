<template>
  <div :class="cssClasses"><slot /></div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "VueGridItem"
})
export default class VueGridItem extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  fill!: boolean;
  get cssClasses() {
    const classes = [this.$style.gridItem];

    if (this.fill) {
      classes.push(this.$style.fill);
    }

    return classes;
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.gridItem {
  flex-basis: 100%;
  padding: 0 $screen-phone-gutter * 0.5;

  @include mediaMin(tabletPortrait) {
    flex: 1;
    padding: 0 $screen-tablet-portrait-gutter * 0.5;

    &.fill {
      flex: 1 1 100%;
    }
  }

  @include mediaMin(tabletLandscape) {
    padding: 0 $screen-tablet-landscape-gutter * 0.5;
  }

  @include mediaMin(smallDesktop) {
    padding: 0 $screen-small-desktop-gutter * 0.5;
  }

  @include mediaMin(largeDesktop) {
    padding: 0 $screen-large-desktop-gutter * 0.5;
  }
}
</style>
