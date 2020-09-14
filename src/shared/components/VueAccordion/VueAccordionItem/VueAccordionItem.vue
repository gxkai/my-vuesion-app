<template>
  <div :class="$style.vueAccordionItem">
    <div
      :class="$style.header"
      @click="click"
      @keypress.enter.space.prevent.stop="click"
      tabindex="0"
      role="button"
      :aria-label="title"
    >
      {{ title }} <i :class="iconClasses" />
    </div>
    <vue-collapse :show="show">
      <section :class="$style.body" :aria-expanded="show"><slot /></section>
    </vue-collapse>
  </div>
</template>

<script lang="ts">
import VueCollapse from "../../VueCollapse/VueCollapse.vue";
import {
  Component,
  Inject,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";
@Component({
  name: "VueAccordionItem",
  components: {
    VueCollapse
  }
})
export default class VueAccordionItem extends Vue {
  @Prop({
    type: String,
    required: true
  })
  title!: string;
  @Prop({
    type: Boolean,
    default: false
  })
  initOpen!: boolean;
  @Inject("Register") register;
  @Inject("OpenItem") openItem;
  idx = null;
  open = false;
  get show() {
    return this.open;
  }
  get iconClasses() {
    const classes = [this.$style.icon];

    if (this.show) {
      classes.push(this.$style.open);
    }

    return classes;
  }
  click() {
    this.openItem(this.idx);
  }
  created() {
    this.register(this);
  }
}
</script>

<style lang="scss" module>
@import "../../../design-system";

.vueAccordionItem {
  display: block;
}

.header {
  background: $accordion-item-header-bg;
  box-shadow: $accordion-item-header-shadow;
  padding: $accordion-item-header-padding;
  border: $accordion-item-header-border;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.icon {
  position: absolute;
  margin-top: $space-4;
  right: $space-8;

  &:before,
  &:after {
    content: "";
    transition: all 0.25s ease-in-out;
    position: absolute;
    background-color: $accordion-item-header-arrow-color;
    width: 2px;
    height: 13px;
  }

  &:before {
    transform: translate(4px, 0) rotate(45deg);
  }

  &:after {
    transform: translate(-4px, 0) rotate(-45deg);
  }

  &.open {
    &:before {
      transform: translate(-4px, 0) rotate(45deg);
    }

    &:after {
      transform: translate(4px, 0) rotate(-45deg);
    }
  }
}

.body {
  padding: $accordion-item-body-padding;
  position: relative;
  z-index: 0;
}
</style>
