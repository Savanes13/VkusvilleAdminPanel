<script lang="ts" setup>
import InterviewsAddWindow from '@/components/shared/elements/modalWindow/interviews/InterviewsAddWindow.vue';
import ColumnTable from './components/columnTable/ColumnTable.vue';
import TimeBlock from './components/timeBlock/TimeBlock.vue';
import InterviewsDeleteWindow from '@/components/shared/elements/modalWindow/interviews/InterviewsDeleteWindow.vue';

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


const daysOfMonth = data.map(item => {
  const date = new Date(item.day);
  return date.getDate();
});
</script>

<template>
  <div class="table">
    

    <!-- {{ data }} -->

    <!-- {{ daysOfMonth }} -->
    
    <TimeBlock/>

    <div class="table__columns">
      <ColumnTable
        v-for="(item, index) in data"
        :data="item"
        :index="index"
        :number-day="daysOfMonth[index]"
        :key="index"
      />
    </div>

    <!-- <InterviewsAddWindow
    
    /> -->

    <!-- <InterviewsDeleteWindow
    
    /> -->

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.table {
  display: flex;
}

.table__columns {
  display: flex;
  flex: 1;        // ← занимает всю доступную ширину
}
</style>