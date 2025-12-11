<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import { ref, watch } from 'vue';

interface IStageWindowProps {
  startDate: string;
  opportunityDate: string;
  deadlineAll: string;
};

const {
  startDate,
  opportunityDate,
  deadlineAll,
} = defineProps<IStageWindowProps>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update:start-date', value: string): void;
  (e: 'update:opportunity-date', value: string): void;
  (e: 'update:deadline-date', value: string): void;
}>();

const closeWindow = () => {
  emit("close");
};

const startDateValue = ref<Date>(new Date(startDate));
const opportunityDateValue = ref<Date>(new Date(opportunityDate));
const deadlineAllValue = ref<Date>(new Date(deadlineAll));


watch(() => startDate, (newVal) => {
  if (newVal) startDateValue.value = new Date(newVal);
});

watch(startDateValue, (val) => {
  emit('update:start-date', val.toISOString()); 
});


watch(() => opportunityDate, (newVal) => {
  if (newVal) opportunityDateValue.value = new Date(newVal);
});

watch(opportunityDateValue, (val) => {
  emit('update:opportunity-date', val.toISOString()); 
});


watch(() => deadlineAll, (newVal) => {
  if (newVal) deadlineAllValue.value = new Date(newVal);
});

watch(deadlineAllValue, (val) => {
  emit('update:deadline-date', val.toISOString()); 
});
</script>

<template>
  <BackgroundModal>
    <div 
      class="stage-window"
    > 
      <ModalWindow
        name="Настройка"
        @close="closeWindow"
      >
        {{ startDate }}
        {{ opportunityDate }}
        {{ deadlineAll }}

        <VDatePicker v-model="startDateValue" />

        <VDatePicker v-model="opportunityDateValue" />

        <VDatePicker v-model="deadlineAllValue" />

      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
.stage-window {
  width: 560px;
}
</style>