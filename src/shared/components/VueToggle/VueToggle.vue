<template>
  <div :class="cssClasses">
    <input
      ref="input"
      type="checkbox"
      :name="name"
      :id="id"
      :checked="isChecked"
      :required="required"
      :disabled="disabled"
      v-validate="validation"
      @change.prevent="onClick"
      @focus="focus = true"
      @blur="focus = false"
      v-bind="$attrs"
    />
    <div :class="$style.container" @click="onClick">
      <div
        :class="$style.handle"
        :aria-checked="isChecked ? 'true' : 'false'"
        role="checkbox"
      />
    </div>
    <label :for="name" v-html="label" />
  </div>
</template>

<script lang="ts">
import { Validator } from "vee-validate";
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "VueToggle",
  inheritAttrs: false
})
export default class VueToggle extends Vue {
  @Inject({
    default: new Validator({}, {})
  })
  $validator!: Validator;
  @Prop({
    type: String,
    required: true
  })
  name!: string;
  @Prop({
    type: String,
    required: true
  })
  id!: string;
  @Prop({
    type: Boolean
  })
  checked!: boolean;
  @Prop({
    type: Boolean
  })
  disabled!: boolean;
  @Prop({
    type: Boolean
  })
  required!: boolean;
  @Prop({
    type: String
  })
  validation!: string;
  @Prop({
    type: String,
    required: true
  })
  label!: string;
  @Prop({
    type: Boolean
  })
  value!: boolean;

  focus = false;

  get isChecked() {
    return this.checked || this.value;
  }
  get cssClasses() {
    const classes: string[] = [this.$style.vueToggle];

    if (this.focus) {
      classes.push(this.$style.focus);
    }

    if (this.isChecked) {
      classes.push(this.$style.checked);
    }

    if (this.disabled) {
      classes.push(this.$style.disabled);
    }

    return classes;
  }

  onClick(e: Event) {
    e.preventDefault();
    (this.$refs.input as HTMLInputElement).focus();

    if (!this.disabled) {
      this.$emit("click", e);
      this.$emit("input", !this.value);
    }
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueToggle {
  display: inline-flex;
  user-select: none;
  cursor: pointer;
  align-items: baseline;
  margin: $toggle-margin;

  input {
    position: absolute;
    opacity: 0;
  }

  label {
    position: relative;
    margin-left: $space-12;
    cursor: pointer;
  }
}

.container {
  border-radius: $toggle-border-radius;
  width: $toggle-width;
  height: $toggle-height;
  background: $toggle-bg;
  position: relative;
  transition: $toggle-transition;
  box-shadow: $toggle-shadow;
}

.handle {
  border-radius: $toggle-handle-border-radius;
  width: $toggle-handle-size;
  height: $toggle-handle-size;
  background: $toggle-handle-bg;
  box-shadow: $toggle-handle-shadow;
  position: absolute;
  top: -($toggle-handle-size * 0.25);
  transition: $toggle-transition;
  transform: translateX(0);
}

.checked {
  .handle {
    transform: translateX($toggle-width - $toggle-handle-size);
    background: $toggle-handle-checked-bg;
  }
}

.focus {
  .handle {
    box-shadow: $toggle-handle-focused-shadow;
  }
}

.disabled {
  &.focus {
    .handle {
      box-shadow: none;
    }
  }

  .container {
    background: $toggle-disabled-bg;
  }

  .handle {
    background: $toggle-handle-disabled-bg;
  }
}
</style>
