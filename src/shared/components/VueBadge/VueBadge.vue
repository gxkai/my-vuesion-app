<template>
  <span :class="cssClasses"> <slot /> </span>
</template>

<script lang="ts">
import { variationValidator } from "@/shared/components/utils";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueBadge"
})
export default class VueBadge extends Vue {
  @Prop({
    type: String,
    validator: variationValidator,
    default: "default"
  })
  color!: string;
  @Prop({
    type: Boolean
  })
  outlined!: boolean;
  get cssClasses() {
    const classes: string[] = [this.$style.vueBadge];

    if (this.outlined) {
      classes.push(this.$style.outlined);
    }

    classes.push(this.$style[this.color]);

    return classes;
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueBadge {
  display: inline-block;
  padding: $badge-padding;
  margin: $badge-margin;
  font-size: $badge-font-size;
  line-height: $badge-line-height;
  font-weight: $badge-font-weight;
  letter-spacing: $badge-letter-spacing;
  border-radius: $badge-border-radius;
}

@each $variation, $values in $badge-variations {
  .#{$variation} {
    color: map-get($values, "color");
    background: map-get($values, "bg");
  }

  .outlined {
    &.#{$variation} {
      border-color: map-get($values, "bg");
      color: map-get($values, "bg");
    }
  }
}

.outlined {
  border: $badge-outlined-border-width solid transparent;
  background: transparent;
}
</style>
