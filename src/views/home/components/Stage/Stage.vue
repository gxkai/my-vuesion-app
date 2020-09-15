<template>
  <div :class="$style.stage" ref="stage">
    <canvas :class="$style.canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { CircleAnimation } from "@/shared/animations/CircleAnimation";
import VueGrid from "@/shared/components/VueGrid/VueGrid.vue";
import VueGridRow from "@/shared/components/VueGridRow/VueGridRow.vue";
import VueGridItem from "@/shared/components/VueGridItem/VueGridItem.vue";
import VueIconGithub from "@/shared/components/icons/VueIconGithub/VueIconGithub.vue";
import VueHeadline from "@/shared/components/VueHeadline/VueHeadline.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: { VueHeadline, VueIconGithub, VueGridItem, VueGridRow, VueGrid }
})
export default class Stage extends Vue {
  @Prop({
    type: Boolean,
    required: true
  })
  disableParticles!: boolean;
  handleResize() {
    const canvas: HTMLCanvasElement = this.$refs.canvas as HTMLCanvasElement;
    const stage: HTMLElement = this.$refs.stage as HTMLElement;
    const stageRect: ClientRect =
      stage.getClientRects().length > 0
        ? (stage.getClientRects().item(0) as ClientRect)
        : ({
            width: 0,
            height: 0
          } as ClientRect);

    canvas.width = stageRect.width;
    canvas.height = stageRect.height;
  }
  beforeMount() {
    window.addEventListener("resize", this.handleResize);
  }
  mounted() {
    this.handleResize();

    if (!this.disableParticles) {
      CircleAnimation(this.$refs.canvas);
    }
  }
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.stage {
  position: fixed;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.canvas {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: transparent;
  left: 0;
  top: 0;
}
</style>
