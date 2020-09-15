<template>
  <div>
    <stage :disable-particles="disableParticles" />
  </div>
</template>

<script lang="ts">
import Stage from "../components/Stage/Stage.vue";
import HomeSection from "@/views/home/components/HomeSection/HomeSection.vue";
import VueHeadline from "@/shared/components/VueHeadline/VueHeadline.vue";
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/app/appModule";

@Component({
  metaInfo: {
    title: "",
    meta: [
      {
        name: "",
        content: ""
      }
    ]
  },
  components: {
    VueHeadline,
    HomeSection,
    Stage
  }
})
export default class Home extends Vue {
  get disableParticles() {
    return AppModule.config?.features?.disableParticles ?? false;
  }
}
</script>
<style lang="scss" module>
@import "~@/shared/design-system";
</style>
