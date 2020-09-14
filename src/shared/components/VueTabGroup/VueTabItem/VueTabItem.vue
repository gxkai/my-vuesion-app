<template>
  <transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @beforeLeave="beforeLeave"
    @leave="leave"
  >
    <section :class="cssClasses" v-if="show" role="tabpanel"><slot /></section>
  </transition>
</template>

<script lang="ts">
import anime from "animejs";
import { Component, Vue, Prop, Inject, Watch } from "vue-property-decorator";

@Component({
  name: "VueTabItem"
})
export default class VueTabItem extends Vue {
  @Prop({
    type: String,
    required: true
  })
  title!: string;
  @Prop({
    type: Boolean
  })
  isActive!: boolean;
  @Inject("Register") register;
  @Inject("UpdateHeader") updateHeader;
  idx = null;
  active = false;
  @Watch("title")
  $$title(title: string) {
    this.updateHeader(this.idx, { title });
  }
  get show() {
    return this.active;
  }
  get cssClasses(): any {
    const classes = [this.$style.vueTab];

    if (this.active) {
      classes.push(this.$style.active);
    }

    return classes;
  }

  beforeEnter(el: HTMLElement) {
    el.style.opacity = "0.2";
  }
  enter(el: HTMLElement, done: any) {
    done();
    anime({
      targets: el,
      opacity: {
        value: "1",
        duration: 1000,
        elasticity: 0
      },
      easing: "easeInOutSine",
      complete: done
    });
  }
  beforeLeave(el: HTMLElement) {
    el.style.transform = "0.8";
  }
  leave(el: HTMLElement, done: any) {
    done();
    anime({
      targets: el,
      opacity: {
        value: "0",
        duration: 700,
        elasticity: 0
      },
      easing: "easeInOutSine",
      complete: done
    });
  }
  created() {
    this.active = this.isActive;

    this.register(this);
  }
}
</script>

<style lang="scss" module>
@import "../../../design-system";

.vueTab {
  transition: $tab-item-transition;
}
</style>
