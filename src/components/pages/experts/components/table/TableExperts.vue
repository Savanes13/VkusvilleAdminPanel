<script lang="ts" setup>
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface StageTask {
  stage_id: number;
  value: number;
}

interface IStabExpert {
  id: number;
  display_name: string;
  level: number;
  is_auth: boolean;
  unreviewed_tasks: StageTask[];
  review_timeout_tasks: StageTask[];
  deadline_tasks: StageTask[];
}

interface ITableExpertsProps {
  data: IStabExpert[]
}

const {
  data,
} = defineProps<ITableExpertsProps>();
</script>

<template>
  <div class="table-experts">

    <HeaderTable/>
    <LineTable
      v-for="(item, index) in data"
      :id="item.id"
      :display_name="item.display_name"
      :level="item.level"
      :is_auth="item.is_auth"
      :unreviewed_tasks="item.unreviewed_tasks"
      :review_timeout_tasks="item.review_timeout_tasks"
      :deadline_tasks="item.deadline_tasks"
      :last-line="index === data.length - 1"
    />
    
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

</style>