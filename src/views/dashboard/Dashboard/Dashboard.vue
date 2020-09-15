<template>
  <div :class="$style.dashboard">
    <vue-grid>
      <vue-breadcrumb
        :items="[{ label: 'Home', href: '/' }, { label: 'VueX Example' }]"
      />
      <vue-grid-row>
        <vue-grid-item fill>
          <vue-headline level="1">Dashboard</vue-headline>
          This demo demonstrates the authentication and re-authentication flow.
          <br />
          <strong>Make sure to open the console to see the whole flow.</strong>
          <br />
          <br />
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
import VueGrid from "@/shared/components/VueGrid/VueGrid.vue";
import VueGridItem from "@/shared/components/VueGridItem/VueGridItem.vue";
import VueButton from "@/shared/components/VueButton/VueButton.vue";
import VueGridRow from "@/shared/components/VueGridRow/VueGridRow.vue";
import VueHeadline from "@/shared/components/VueHeadline/VueHeadline.vue";
import VueBreadcrumb from "@/shared/components/VueBreadcrumb/VueBreadcrumb.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  metaInfo: {
    title: "Dashboard"
  },
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
    VueHeadline
  }
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.dashboard {
  margin-top: $nav-bar-height;
  min-height: 500px;
}
</style>
