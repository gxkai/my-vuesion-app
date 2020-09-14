<template>
  <div :class="[$style.homeSection, alternative ? $style.alternative : null]">
    <vue-grid>
      <vue-grid-row :class="[flip ? $style.flip : null]">
        <vue-grid-item :class="$style.image">
          <vue-image :src="image" :native="false" :class="$style.image" />
        </vue-grid-item>
        <vue-grid-item :class="$style.text"><slot /></vue-grid-item>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
import VueGrid from "@/shared/components/VueGrid/VueGrid.vue";
import VueGridRow from "@/shared/components/VueGridRow/VueGridRow.vue";
import VueGridItem from "@/shared/components/VueGridItem/VueGridItem.vue";
import VueImage from "@/shared/components/VueImage/VueImage.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "HomeSection",
  components: { VueImage, VueGridItem, VueGridRow, VueGrid }
})
export default class HomeSection extends Vue {
  @Prop({
    type: String,
    required: true
  })
  image!: string;
  @Prop({
    type: Boolean
  })
  alternative!: boolean;
  @Prop({
    type: Boolean
  })
  flip!: boolean;
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.homeSection {
  padding: $space-48 0;

  @include mediaMin(tabletPortrait) {
    padding: $space-84 0;
  }
}

.alternative {
  background: $brand-bg-color-variant;
}

.flip {
  @include mediaMin(tabletPortrait) {
    flex-direction: row-reverse;
  }
}

.image {
  min-height: 256px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-bottom: $space-32;

  @include mediaMin(tabletPortrait) {
    min-height: 512px;
    margin-bottom: 0;
  }
}
</style>
