<template>
  <thead :class="$style.vueDataTableHeader">
    <tr>
      <th
        v-for="(column, idx) in visibleColumns"
        :key="idx"
        :class="[$style.column, column.cssClass && column.cssClass]"
        @click="onClick(column)"
      >
        {{ column.title }}

        <div :class="$style.icons" v-if="column.sortable">
          <vue-icon-sort v-if="!sortKey && !isActive(column.sortKey)" />
          <vue-icon-sort-up
            v-if="isActive(column.sortKey) && sortDirection === 'asc'"
          />
          <vue-icon-sort-down
            v-if="isActive(column.sortKey) && sortDirection === 'desc'"
          />
        </div>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { IDataTableHeaderItem } from "../IDataTable";
import VueIconSort from "../../icons/VueIconSort/VueIconSort.vue";
import VueIconSortUp from "../../icons/VueIconSortUp/VueIconSortUp.vue";
import VueIconSortDown from "../../icons/VueIconSortDown/VueIconSortDown.vue";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VueDataTableHeader",
  components: { VueIconSortDown, VueIconSortUp, VueIconSort }
})
export default class VueDataTableHeader extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  columns!: any[];
  @Prop({
    type: String
  })
  sortKey!: string;
  @Prop({
    type: String,
    required: true
  })
  sortDirection!: string;
  get visibleColumns() {
    return this.columns.filter(
      (column: IDataTableHeaderItem) => column.visible
    );
  }
  onClick(column: IDataTableHeaderItem) {
    if (column.sortable) {
      this.$emit("click", column);
    }
  }
  isActive(sortKey: string) {
    return sortKey === this.sortKey;
  }
}
</script>

<style lang="scss" module>
@import "../../../design-system";

.vueDataTableHeader {
  border: $data-table-header-border;
  background: $data-table-header-bg;

  min-width: $data-table-min-width;

  th {
    font-weight: $data-table-header-font-weight;
  }

  tr {
    width: $data-table-width;
    min-width: $data-table-min-width;
  }
}

.column {
  border-right: $data-table-header-border;
  padding: $data-table-header-column-padding;
  cursor: pointer;
  user-select: none;

  &:hover {
    i {
      color: $data-table-header-icon-hover-color;
      opacity: 1;
    }
  }

  &:last-child {
    border-right: none;
  }

  i {
    margin: $data-table-header-icon-margin;
    color: $data-table-header-icon-color;
  }
}

.icons {
  display: inline-block;
  width: $space-12;
  float: right;
}
</style>
