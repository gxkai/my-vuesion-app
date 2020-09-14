<template>
  <collapse-animation :duration="duration">
    <slot v-if="show" />
  </collapse-animation>
</template>

<script lang="ts">
import CollapseAnimation from "../../animations/CollapseAnimation/CollapseAnimation.vue";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueCollapse",
  components: {
    CollapseAnimation
  }
})
export default class VueCollapse extends Vue {
  @Prop({
    default: true,
    type: Boolean
  })
  show!: boolean;
  @Prop({
    type: Number,
    default: 250
  })
  duration!: number;
}
</script>
