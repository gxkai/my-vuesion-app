<template>
  <div :class="$style.vueCardBody"><slot /></div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueCardBody"
})
export default class VueCardBody extends Vue {}
</script>

<style lang="scss" module>
@import "../../../design-system";

.vueCardBody {
  display: block;
  padding: $card-body-padding;
}
</style>
