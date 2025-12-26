<script lang="ts" setup>
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableLine {
  key: string;
  value: string;
  required_keys: string[]
}

interface ITableContentProps {
  data: ITableLine[]
}

const {
  data
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

    <!-- <div class="table__body">

    </div> -->

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

</style>