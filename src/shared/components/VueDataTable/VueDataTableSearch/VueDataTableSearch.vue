<template>
  <div :class="$style.vueDataTableSearch">
    <vue-input
      id="dataTableSearch"
      name="dataTableSearch"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script lang="ts">
import VueInput from "../../VueInput/VueInput.vue";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueDataTableSearch",
  components: { VueInput }
})
export default class VueDataTableSearch extends Vue {
  @Prop({
    type: String
  })
  value!: string;
  @Prop({
    type: String
  })
  placeholder!: string;
}
</script>

<style lang="scss" module>
@import "../../../design-system";

.vueDataTableSearch {
  padding-top: $space-12;
}
</style>
