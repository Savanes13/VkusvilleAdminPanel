<script lang="ts" setup>
import type { TDataAdminsAccess } from '@/types/pages/access/accessTypes';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableExpertsProps {
  data: TDataAdminsAccess;
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
      :name="item.name"
      :email="item.email"
      :role="item.role"
      :key="index"
      :last-line="index === data.length - 1"
      @delete="deleteAdmin"
    />
  </div>
</template>

<style lang="scss" scoped>
  
</style>