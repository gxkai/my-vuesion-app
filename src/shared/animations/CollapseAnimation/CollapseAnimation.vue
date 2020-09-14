<template>
  <transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @beforeLeave="beforeLeave"
    @leave="leave"
    :css="false"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import anime from "animejs";
import {
  Component,
  Inject,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";

@Component({
  name: "CollapseAnimation"
})
export default class CollapseAnimation extends Vue {
  @Prop({
    type: Number,
    default: 250
  })
  duration!: number;
  beforeEnter(el: HTMLElement) {
    el.style.height = "0";
    el.style.opacity = "0";
    el.style.overflow = "hidden";
  }
  enter(el: HTMLElement, done: any) {
    anime({
      targets: el,
      height: {
        value: `${el.scrollHeight}px`,
        duration: this.duration
      },
      opacity: {
        value: 1,
        duration: this.duration
      },
      round: 1,
      easing: "easeInOutCirc",
      complete: done
    });
  }
  beforeLeave(el: HTMLElement) {
    el.style.overflow = "hidden";
  }
  leave(el: HTMLElement, done: any) {
    anime({
      targets: el,
      height: {
        value: `0`,
        duration: this.duration
      },
      opacity: {
        value: 0,
        duration: this.duration
      },
      paddingTop: {
        value: 0,
        duration: this.duration
      },
      paddingBottom: {
        value: 0,
        duration: this.duration
      },
      marginTop: {
        value: 0,
        duration: this.duration
      },
      marginBottom: {
        value: 0,
        duration: this.duration
      },
      round: 1,
      easing: "easeInOutCirc",
      complete: done
    });
  }
}
</script>
