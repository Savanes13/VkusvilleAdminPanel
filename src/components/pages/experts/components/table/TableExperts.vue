<script lang="ts" setup>
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

type IExpertStats = {
  first: number;
  second: number;
};

interface IStabExpert {
  id: number;
  name: string;
  isAuth: boolean;
  untested: IExpertStats;
  overdue: IExpertStats;
  deadline: IExpertStats;
};

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
      v-for="item in data"
      :id="item.id"
      :name="item.name"
      :is-auth="item.isAuth"
      :untested="item.untested"
      :overdue="item.overdue"
      :deadline="item.deadline"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

</style>