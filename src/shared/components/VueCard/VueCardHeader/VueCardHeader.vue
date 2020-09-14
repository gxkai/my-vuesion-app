<template>
  <div :class="cssClasses">
    <img :src="image" v-if="image" :alt="title" />
    <div>
      <div :class="$style.title" v-if="title">{{ title }}</div>
      <div :class="$style.subtitle" v-if="subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueCardHeader"
})
export default class VueCardHeader extends Vue {
  @Prop({
    type: String
  })
  title!: string;
  @Prop({
    type: String
  })
  subtitle!: string;
  @Prop({
    type: String
  })
  image!: string;
  get cssClasses() {
    const classes = ["vue-card-header", this.$style.vueCardHeader];

    if (this.image) {
      classes.push(this.$style.withImage);
    }

    return classes;
  }
}
</script>

<style lang="scss" module>
@import "../../../design-system";

.vueCardHeader {
  display: block;
  padding: $card-header-padding;
  line-height: 1.7;

  &.withImage {
    display: flex;
    flex-direction: row;

    img {
      width: $card-header-image-size;
      height: $card-header-image-size;
      border-radius: $card-header-image-border-radius;
      flex-shrink: 0;
      display: block;
      margin: $card-header-image-margin;
    }
  }

  .title {
    font-size: $card-header-title-font-size;
    font-weight: $card-header-title-font-weight;
    display: block;
  }

  .subtitle {
    font-size: $card-header-subtitle-font-size;
    font-weight: $card-header-subtitle-font-weight;
    color: $card-header-subtitle-color;
    display: block;
  }
}
</style>
