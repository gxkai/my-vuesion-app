<template>
  <div :class="$style.vueDatePicker" @click="show = true">
    <vue-input
      :name="name"
      :id="id"
      :value="inputValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :message="message"
      @focus="onFocus"
    />
    <vue-modal :show="show" :fit-content="true" @close="show = false">
      <vue-calendar
        :min-date="minDate"
        :max-date="maxDate"
        :first-day-of-week="firstDayOfWeek"
        :class="$style.calendar"
        :selected-date="date"
        :start-date="startDate"
        :end-date="endDate"
        @close="show = false"
        @change="onChange"
      >
      </vue-calendar>
    </vue-modal>
  </div>
</template>

<script lang="ts">
import VueInput from "../VueInput/VueInput.vue";
import VueModal from "../VueModal/VueModal.vue";
import VueCalendar from "../VueCalendar/VueCalendar.vue";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "VueDatePicker",
  components: {
    VueInput,
    VueModal,
    VueCalendar
  }
})
export default class VueDatePicker extends Vue {
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
    type: Date
  })
  minDate!: Date;
  @Prop({
    type: Date
  })
  maxDate!: Date;
  @Prop({
    type: Number,
    default: 0
  })
  firstDayOfWeek!: number;
  @Prop({
    type: String
  })
  placeholder!: string;
  @Prop({
    type: Date
  })
  startDate!: Date;
  @Prop({
    type: Date
  })
  endDate!: Date;
  @Prop({
    type: Date
  })
  currentDate!: Date;
  @Prop({
    type: Boolean
  })
  required!: boolean;
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
  show = false;
  selectedDate!: Date | null;
  get inputValue() {
    return this.date === null ? "" : this.$d(this.date, "datePicker");
  }
  get date() {
    if (this.currentDate) {
      return this.currentDate;
    }

    return this.selectedDate;
  }
  onFocus(e: any) {
    e.currentTarget.blur();
    this.show = true;
  }
  onChange(date: Date): void {
    this.selectedDate = date;
    this.$emit("change", this.selectedDate);
  }
}
</script>

<style lang="scss" module>
@import "~@/shared/design-system";

.vueDatePicker {
  display: block;
}

.calendar {
  @include mediaMin(tabletPortrait) {
    width: $calendar-max-width !important;

    table {
      tr {
        td {
          font-size: $font-size-h5;

          span {
            top: 17%;
          }
        }
      }
    }
  }
}
</style>
