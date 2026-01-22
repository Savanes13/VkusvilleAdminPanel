<script lang="ts" setup>
import type { TDataAdminAdminsAccess } from '@/types/pages/access/accessTypes';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableExpertsProps {
  data: TDataAdminAdminsAccess;
}
const {
  data
} = defineProps<ITableExpertsProps>();

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>();

const deleteAdmin = (id: number) => {
  emit('delete', id);
};
</script>

<template>
  <div class="table">
    <HeaderTable/>
    <LineTable
      v-for="(item, index) in data"
      :name="item.display_name"
      :email="item.email"
      :role="item.role"
      :key="index"
      :last-line="index === data.length - 1"
      @delete="() => deleteAdmin(item.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
  
</style>