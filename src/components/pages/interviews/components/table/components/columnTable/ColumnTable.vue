<script lang="ts" setup>
import { computed } from 'vue';
import ColumnItem from './components/ColumnItem.vue';
import InterviewsAddWindow from '@/components/shared/elements/modalWindow/interviews/InterviewsAddWindow.vue';

type Interview = {
  id: number;
  start_time: number;
  reviewer_ids: number[];
};

type DayInterviews = {
  day: number;
  interviews: Interview[];
};

interface IColumnTableProps {
  data: DayInterviews;
  index: number;
  numberDay: number;
}

const {
  data,
  index,
  numberDay
} = defineProps<IColumnTableProps>();

const day = computed(() => {
  if (index === 0) return "Пн"
  if (index === 1) return "Вт"
  if (index === 2) return "Ср"
  if (index === 3) return "Чт"
  if (index === 4) return "Пт"
})
</script>

<template>
  <div class="column-table">

    <!-- {{ data }} -->

    <div class="column-table__day">
      <p>{{ day }} {{ numberDay }}</p>
    </div>

    <ColumnItem
      v-for="(item, index) in 11"
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

.column-table__day {
  padding: 20px 0px;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}
</style>