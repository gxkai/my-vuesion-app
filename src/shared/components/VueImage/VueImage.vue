<template>
  <component :is="component" ref="image" />
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueImage"
})
export default class VueImage extends Vue {
  @Prop({
    type: Boolean,
    default: true
  })
  native!: boolean;
  @Prop({
    type: String,
    required: true
  })
  src!: string;
  observer?: IntersectionObserver;

  get component() {
    return this.native ? "img" : "div";
  }
  setImage() {
    if (this.native) {
      (this.$refs.image as any).src = this.src;
    } else {
      (this.$refs.image as any).style.backgroundImage = `url(${this.src})`;
    }
  }
  handleObserver(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio > 0) {
        this.setImage();
        (this.observer as IntersectionObserver).disconnect();
      }
    });
  }
  createObserver() {
    this.observer = new IntersectionObserver(this.handleObserver, {
      rootMargin: "0px",
      threshold: 0.1
    });
    this.observer.observe(this.$refs.image as Element);
  }
  mounted() {
    if ((window as any).IntersectionObserver) {
      this.createObserver();
    } else {
      this.setImage();
    }
  }
}
</script>
