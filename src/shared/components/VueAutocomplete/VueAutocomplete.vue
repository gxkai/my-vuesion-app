<template>
  <div
    :class="$style.vueAutocomplete"
    :aria-expanded="isOpen ? 'true' : 'false'"
    aria-haspopup="true"
    aria-owns="autocomplete-results"
    role="combobox"
  >
    <vue-input
      role="searchbox"
      aria-autocomplete="list"
      :aria-controls="`autocomplete-results-${id}`"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :required="required"
      :autofocus="autofocus"
      :value="searchQuery"
      :disabled="disabled"
      :readonly="readonly"
      :message="message"
      :errorMessage="errorMessage"
      :validation="validation"
      :autocomplete="autocomplete"
      :aria-activedescendant="
        hasOptions ? `result-item-${selectedOptionIndex}-${id}` : null
      "
      @input="onInput"
      @keyup.stop.prevent.down="onArrowDown"
      @keydown.stop.prevent.up="onArrowUp"
      @keydown.stop.enter.tab="onEnterKeyPress"
      @focus.stop.prevent="onFocus"
    />

    <vue-icon-search v-show="isLoading === false" />
    <vue-loader
      :class="$style.loader"
      color="secondary"
      v-show="isLoading === true"
    />

    <ul
      ref="resultContainer"
      role="listbox"
      :id="`autocomplete-results-${id}`"
      :style="{ height: resultContainerHeight + 'px' }"
      v-show="isOpen === true && isLoading === false"
    >
      <li
        v-if="hasOptions === false"
        v-html="
          $t(
            'components.autocomplete.emptyMessage' /* No options found for %s */
          ).replace('%s', searchQuery)
        "
      ></li>

      <li
        role="option"
        v-else
        v-for="(option, index) in options"
        :key="index"
        :id="`result-item-${index}-${id}`"
        :aria-selected="isSelected(index)"
        :class="isSelected(index) ? $style.isSelected : ''"
        @click="onOptionClick(index)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import debounce from "lodash/debounce";
import { getGUID } from "@vuesion/utils/dist/randomGenerator";
import { IAutocompleteOption } from "./IAutocompleteOption";
import VueInput from "../VueInput/VueInput.vue";
import VueLoader from "../VueLoader/VueLoader.vue";
import VueIconSearch from "../icons/VueIconSearch/VueIconSearch.vue";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueAutocomplete",
  components: {
    VueIconSearch,
    VueLoader,
    VueInput
  }
})
export default class VueAutocomplete extends Vue {
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
    type: String
  })
  placeholder!: string;
  @Prop({
    type: Boolean
  })
  required!: boolean;
  @Prop({
    type: Boolean
  })
  autofocus!: boolean;
  @Prop({
    type: Object,
    default: () => ({ label: "", value: "" })
  })
  value!: { [key: string]: any };
  @Prop({
    type: String,
    default: "text"
  })
  type!: string;
  @Prop({
    type: Boolean
  })
  disabled!: boolean;
  @Prop({
    type: Boolean
  })
  readonly!: boolean;
  @Prop({
    type: String
  })
  message!: string;
  @Prop({
    type: String
  })
  errorMessage!: string;
  @Prop({
    type: String
  })
  validation!: string;
  @Prop({
    type: String,
    default: "off"
  })
  autocomplete!: string;
  @Prop({
    type: Array,
    default: (): any[] => []
  })
  options!: any[];
  @Prop({
    type: Number,
    default: 5
  })
  maxOptions!: number;
  @Prop({
    type: Number,
    default: 3
  })
  minInputChars!: number;
  @Prop({
    type: Boolean,
    default: false
  })
  isLoading!: boolean;

  isOpen = false;
  searchQuery = "";
  previousQuery = "";
  selectedOptionIndex = 0;
  resultContainerHeight = 0;
  get hasOptions() {
    return this.options.length > 0;
  }

  setResultContainerHeight() {
    const resultContainerItem: HTMLElement = (this.$refs.resultContainer as any)
      .firstChild;
    const resultContainerItemHeight = resultContainerItem.offsetHeight;
    let newHeight: number = resultContainerItemHeight;

    if (this.options.length > 0) {
      newHeight = resultContainerItemHeight * this.options.length;

      if (this.options.length > this.maxOptions) {
        newHeight =
          this.maxOptions * resultContainerItemHeight +
          resultContainerItemHeight / 2;
      }
    }

    this.resultContainerHeight = newHeight;
  }
  isSameSearchQuery() {
    return this.previousQuery === this.searchQuery;
  }
  onFocus() {
    if (
      this.options.length > 0 &&
      this.searchQuery.length >= this.minInputChars
    ) {
      this.isOpen = true;
    }
  }
  onFocusItem() {
    const resultContainer: HTMLElement = this.$refs
      .resultContainer as HTMLElement;
    const resultContainerClientHeight: number = resultContainer.clientHeight;
    const resultContainerScrollHeight: number = resultContainer.scrollHeight;

    if (resultContainerScrollHeight > resultContainerClientHeight) {
      const element: HTMLElement = document.querySelector(
        `#result-item-${this.selectedOptionIndex}-${this.id}`
      ) as HTMLElement;

      if (element === null) {
        return;
      }

      const scrollBottom: number =
        resultContainerClientHeight + resultContainer.scrollTop;
      const elementBottom: number = element.offsetTop + element.offsetHeight;

      if (elementBottom > scrollBottom) {
        resultContainer.scrollTop =
          elementBottom - resultContainer.clientHeight;
      } else if (element.offsetTop < resultContainer.scrollTop) {
        resultContainer.scrollTop = element.offsetTop;
      }
    }
  }
  handleOutsideClick(e: Event) {
    if (!this.$el.contains(e.target as Node)) {
      this.isOpen = false;
    }
  }
  onArrowUp() {
    if (!this.isOpen) {
      return;
    }

    if (this.selectedOptionIndex > 0) {
      this.selectedOptionIndex -= 1;
    } else {
      this.selectedOptionIndex = this.options.length - 1;
    }

    this.onFocusItem();
  }
  onArrowDown() {
    if (!this.isOpen) {
      return;
    }

    if (this.selectedOptionIndex < this.options.length - 1) {
      this.selectedOptionIndex += 1;
    } else {
      this.selectedOptionIndex = 0;
    }

    this.onFocusItem();
  }
  isSelected(index: number) {
    return index === this.selectedOptionIndex;
  }
  emitRequest() {
    debounce(() => {
      this.$emit("request", this.searchQuery);
      this.isOpen = true;
      this.selectedOptionIndex = -1;
    }, 300);
  }

  onInput(query: string) {
    this.searchQuery = query;

    if (this.searchQuery.length >= this.minInputChars) {
      this.emitRequest();
    } else {
      this.isOpen = false;
    }
  }
  onEnterKeyPress(e: any) {
    if (this.isOpen) {
      e.preventDefault();
    }

    if (
      this.searchQuery.length < this.minInputChars ||
      this.options.length === 0
    ) {
      return;
    }

    if (this.selectedOptionIndex === -1) {
      this.selectedOptionIndex = 0;
    }

    this.onOptionClick(this.selectedOptionIndex);
  }
  onOptionClick(index: number) {
    this.triggerChange(this.options[index]);
  }
  triggerChange(option: IAutocompleteOption) {
    this.searchQuery = option.label;

    this.$emit("change", option);
    this.$emit("input", option);

    if (this.isSameSearchQuery()) {
      return;
    }
    this.previousQuery = this.searchQuery;
    this.isOpen = false;
  }

  @Watch("options")
  $$options() {
    this.isOpen = true;
    this.$nextTick(() => {
      this.setResultContainerHeight();
    });
  }
  mounted() {
    this.searchQuery = this.value.label;
    document.addEventListener("click", this.handleOutsideClick);
  }
  destroyed() {
    document.removeEventListener("click", this.handleOutsideClick);
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueAutocomplete {
  position: relative;

  > i {
    position: absolute;
    top: $space-8;
    right: 0;
  }

  .loader {
    position: absolute;
    top: $space-8;
    right: 0;
    width: $space-12;
    height: $space-12;

    :global {
      .vueLoaderPath {
        stroke-width: $space-8;
      }
    }
  }

  ul {
    background: $autocomplete-bg;
    padding: $autocomplete-padding;
    margin: $autocomplete-margin;
    position: absolute;
    width: 100%;
    list-style: none;
    z-index: 2000;
    box-shadow: $autocomplete-shadow;
    overflow: scroll;
    border: $autocomplete-border;
    border-top: none;

    li {
      padding: $autocomplete-item-padding;
      border-top: $autocomplete-item-border;

      &[role="option"] {
        cursor: pointer;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .isSelected {
    background: $autocomplete-item-selected-bg;
    color: $autocomplete-item-selected-color;
  }
}
</style>
