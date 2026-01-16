<script lang="ts" setup>
import type { TDataAdmins } from '@/types/pages/access/accessTypes';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableExpertsProps {
  data: TDataAdmins;
}
const {
  data
} = defineProps<ITableExpertsProps>();
</script>

<template>
  <div class="table">
    <HeaderTable/>
    <LineTable
      v-for="(item, index) in data"
      :name="item.name"
      :phone="item.phone"
      :role="item.role"
      :key="index"
      :last-line="index === data.length - 1"
    />
  </div>
</template>

<style lang="scss" scoped>
  
</style>