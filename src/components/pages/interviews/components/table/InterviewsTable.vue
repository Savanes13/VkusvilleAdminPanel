<script lang="ts" setup>
import { computed } from 'vue';
import ColumnTable from './components/columnTable/ColumnTable.vue';
import TimeBlock from './components/timeBlock/TimeBlock.vue';

type Interview = {
  id: number
  start_time: number;
  reviewer_ids: number[];
};

type DayInterviews = {
  day: number;
  interviews: Interview[];
};

interface IInterviewsTableProps {
  data: DayInterviews[]
}

const {
  data
} = defineProps<IInterviewsTableProps>();

const emit = defineEmits<{
  (e: 'openAddWindow', id: number, experts: number[]): void
}>();

const daysOfMonth = computed(() =>
  data.map(item => {
    const date = new Date(item.day);
    return date.getDate();
  })
);

const openAddExpertWindow = (id: number, arrExperts: number[]) => {
  emit('openAddWindow', id, arrExperts)
}
</script>

<template>
  <div class="table">     
    <TimeBlock/>

    <div class="table__columns">
      <ColumnTable
        v-for="(item, index) in data"
        :data="item"
        :index="index"
        :number-day="daysOfMonth[index]!"
        :key="index"
        @open-add-window="openAddExpertWindow"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.table {
  display: flex;
}

.table__columns {
  display: flex;
  flex: 1; 
}
</style>