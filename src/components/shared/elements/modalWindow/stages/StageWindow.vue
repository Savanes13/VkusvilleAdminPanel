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
}>();

const closeWindow = () => {
  emit("close");
};

const startDateValue = ref<Date>(new Date(startDate));



watch(() => startDate, (newVal) => {
  if (newVal) startDateValue.value = new Date(newVal);
});

watch(startDateValue, (val) => {
  emit('update:start-date', val.toISOString()); 
});


</script>

<template>
  <BackgroundModal>
    <div 
      class="stage-window"
    > 
      <ModalWindow
        name="Настройка"
      >
        {{ startDate }}

        <VDatePicker v-model="startDateValue" />

      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
.stage-window {
  width: 560px;
}
</style>