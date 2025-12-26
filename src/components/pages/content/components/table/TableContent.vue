<script lang="ts" setup>
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableLine {
  key: string;
  value: string;
  required_keys: string[];
}

interface ITableContentProps {
  data: ITableLine[];
  missingLines: number;
}

const {
  data,
  missingLines
} = defineProps<ITableContentProps>();
</script>

<template>
  <div class="table">

    <!-- TODO: сюда поиск -->

    <HeaderTable
    
    />

    <LineTable
      v-for="item in data"
      :key-line="item.key"
      :text="item.value"
      :key="item.key"
    />

    <LineTable
      v-for="(line, index) in missingLines"
      :empty="true"
      key-line=""
      text=""
      :key="index"
    />

    <!-- <div class="table__body">

    </div> -->

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

</style>