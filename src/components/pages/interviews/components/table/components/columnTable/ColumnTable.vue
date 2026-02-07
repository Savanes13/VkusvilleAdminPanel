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
  indexColumn: number;
  numberDay: number;
}

const {
  data,
  indexColumn,
  numberDay
} = defineProps<IColumnTableProps>();

const emit = defineEmits<{
  (e: 'openAddWindow', id: number, experts: number[]): void
}>();

const day = computed(() => {
  if (indexColumn === 0) return "Пн"
  if (indexColumn === 1) return "Вт"
  if (indexColumn === 2) return "Ср"
  if (indexColumn === 3) return "Чт"
  if (indexColumn === 4) return "Пт"
})

const openAddExpertWindow = (id: number, arrExperts: number[]) => {
  emit('openAddWindow', id, arrExperts)
}
</script>

<template>
  <div class="column-table">

    <div class="column-table__day">
      <p>{{ day }} {{ numberDay }}</p>
    </div>

    <ColumnItem
      v-for="(item, index) in 12"
      :time="index"
      :data="data"
      :day="day!"
      :number-day="numberDay"
      :first-line="index === 0"
      :column-index="indexColumn"
      @open-add-window="openAddExpertWindow"
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