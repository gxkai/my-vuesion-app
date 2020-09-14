<template>
  <div>
    <vue-headline level="1">Icons</vue-headline>
    <br />
    <div :class="$style.icons">
      <vue-icon-book />
      <vue-icon-bullhorn />
      <vue-icon-certificate />
      <vue-icon-chart-line />
      <vue-icon-code />
      <vue-icon-flag />
      <vue-icon-github />
      <vue-icon-github-alt />
      <vue-icon-hashtag />
      <vue-icon-mobile />
      <vue-icon-puzzle-piece />
      <vue-icon-search />
      <vue-icon-sort />
      <vue-icon-sort-down />
      <vue-icon-sort-up />
      <vue-icon-spinner />
      <vue-icon-times />
      <vue-icon-twitter-square />
      <vue-icon-vuesion />
      <vue-icon-star />
    </div>
  </div>
</template>

<script lang="ts">
import VueHeadline from "@/shared/components/VueHeadline/VueHeadline.vue";
import VueIconBook from "@/shared/components/icons/VueIconBook/VueIconBook.vue";
import VueIconBullhorn from "@/shared/components/icons/VueIconBullhorn/VueIconBullhorn.vue";
import VueIconCertificate from "@/shared/components/icons/VueIconCertificate/VueIconCertificate.vue";
import VueIconChartLine from "@/shared/components/icons/VueIconChartLine/VueIconChartLine.vue";
import VueIconCode from "@/shared/components/icons/VueIconCode/VueIconCode.vue";
import VueIconFlag from "@/shared/components/icons/VueIconFlag/VueIconFlag.vue";
import VueIconGithub from "@/shared/components/icons/VueIconGithub/VueIconGithub.vue";
import VueIconGithubAlt from "@/shared/components/icons/VueIconGithubAlt/VueIconGithubAlt.vue";
import VueIconHashtag from "@/shared/components/icons/VueIconHashtag/VueIconHashtag.vue";
import VueIconMobile from "@/shared/components/icons/VueIconMobile/VueIconMobile.vue";
import VueIconPuzzlePiece from "@/shared/components/icons/VueIconPuzzlePiece/VueIconPuzzlePiece.vue";
import VueIconSearch from "@/shared/components/icons/VueIconSearch/VueIconSearch.vue";
import VueIconSort from "@/shared/components/icons/VueIconSort/VueIconSort.vue";
import VueIconSortDown from "@/shared/components/icons/VueIconSortDown/VueIconSortDown.vue";
import VueIconSortUp from "@/shared/components/icons/VueIconSortUp/VueIconSortUp.vue";
import VueIconSpinner from "@/shared/components/icons/VueIconSpinner/VueIconSpinner.vue";
import VueIconTimes from "@/shared/components/icons/VueIconTimes/VueIconTimes.vue";
import VueIconTwitterSquare from "@/shared/components/icons/VueIconTwitterSquare/VueIconTwitterSquare.vue";
import VueIconVuesion from "@/shared/components/icons/VueIconVuesion/VueIconVuesion.vue";
import VueIconStar from "@/shared/components/icons/VueIconStar/VueIconStar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "IconList",
  components: {
    VueIconVuesion,
    VueIconTwitterSquare,
    VueIconTimes,
    VueIconSpinner,
    VueIconSortUp,
    VueIconSortDown,
    VueIconSort,
    VueIconSearch,
    VueIconPuzzlePiece,
    VueIconMobile,
    VueIconHashtag,
    VueIconGithubAlt,
    VueIconGithub,
    VueIconFlag,
    VueIconCode,
    VueIconChartLine,
    VueIconCertificate,
    VueIconBullhorn,
    VueIconBook,
    VueHeadline,
    VueIconStar
  }
})
export default class IconList extends Vue {}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.icons {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: $space-20;

  i {
    width: $space-32;
    height: $space-32;
  }
}
</style>
