<script lang="ts" setup>
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableLine {
  id: number;
  display_name: string;
  telegram_id: string;
  stage: number;
  display_grade: number;
  deadline_expired: boolean;
}

interface ITableCApplicantsProps {
  data: ITableLine[];
  missingLines: number;
}

const {
  data,
  missingLines
} = defineProps<ITableCApplicantsProps>();
</script>

<template>
  <div class="table">
    <HeaderTable/>

    <LineTable
      v-for="(item, index) in data"
      :id="item.id"
      :fio="item.display_name"
      :telegram_id="item.telegram_id"
      :stage="item.stage"
      :scores="item.display_grade"
      :deadline="item.deadline_expired"
      :key="`${index} + ${item.telegram_id}`"
      :last-line="missingLines === 0 && index === data.length - 1"
    />
    <LineTable
      v-for="(line, index) in missingLines"
      :empty="true"
      :id="0"
      fio=""
      telegram_id=""
      :stage="1"
      :scores="1"
      :deadline="false"
      :key="index"
      :last-line="index === missingLines - 1"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>