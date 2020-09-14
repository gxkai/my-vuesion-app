<template>
  <div :class="$style.vueCardFooter"><slot /></div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueCardFooter"
})
export default class VueCardFooter extends Vue {}
</script>

<style lang="scss" module>
@import "../../../design-system";

.vueCardFooter {
  display: block;
  padding: $card-footer-padding;
}
</style>
