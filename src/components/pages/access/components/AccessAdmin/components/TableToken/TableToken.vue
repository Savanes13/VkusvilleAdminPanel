<script lang="ts" setup>
import type { TDataTokenAccess } from '@/types/pages/access/accessTypes';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableExpertsProps {
  data: TDataTokenAccess;
}
const {
  data
} = defineProps<ITableExpertsProps>();

const emit = defineEmits<{
  (e: 'delete', number: string): void
}>();

const deleteAdmin = (phone: string) => {
  emit('delete', phone);
};
</script>

<template>
  <div class="table">
    <HeaderTable/>
    <LineTable
      v-for="(item, index) in data"
      :token="item.token"
      :role="item.role"
      @delete="deleteAdmin"
      :last-line="index === data.length - 1"
    />
  </div>
</template>

<style lang="scss" scoped>
  
</style>