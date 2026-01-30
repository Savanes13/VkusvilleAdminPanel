<script lang="ts" setup>
import ColumnItem from './components/ColumnItem.vue';

type Interview = {
  start_time: number;
  reviewer_ids: number[];
};

type DayInterviews = {
  day: number;
  interviews: Interview[];
};

interface IColumnTableProps {
  data: DayInterviews
}

const {
  data
} = defineProps<IColumnTableProps>();
</script>

<template>
  <div class="column-table">

    <!-- {{ data }} -->

    <ColumnItem
      v-for="(item, index) in 12"
      :time="index"
      :data="data"
    />

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.column-table {
  width: 100%;
}
</style>