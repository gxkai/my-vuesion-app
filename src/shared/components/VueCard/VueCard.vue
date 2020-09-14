<template>
  <div :class="$style.vueCard"><slot /></div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueCard"
})
export default class VueCard extends Vue {}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueCard {
  background-color: $card-bg;
  box-shadow: $card-shadow;
  border: $card-border;
  border-radius: $card-border-radius;
  margin: $card-margin;
  color: $card-color;
}
</style>
