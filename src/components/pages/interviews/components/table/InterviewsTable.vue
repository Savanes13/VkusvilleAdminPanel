<script lang="ts" setup>
import ColumnTable from './components/columnTable/ColumnTable.vue';
import TimeBlock from './components/timeBlock/TimeBlock.vue';

type Interview = {
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
// можно уникализироовать по timestamp
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