<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import meeting from '@/assets/images/mainIcons/meeting.svg';
import one from '@/assets/images/mainIcons/one.svg';
import CalendarBlock from './components/CalendarBlock.vue';

interface IStageWindowProps {
  startDate: string;
  opportunityDate: string;
  deadlineAllDate: string;
  numberSelectedStage: number
};

const {
  startDate,
  opportunityDate,
  deadlineAllDate,
  numberSelectedStage
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

const updateDate = (date: string, type: string) => {
  if (type === 'start') emit('update:start-date', date); 
  if (type === 'opportunity') emit('update:opportunity-date', date); 
  if (type === 'deadline') emit('update:deadline-date', date); 
}
</script>

<template>
  <BackgroundModal>
    <div 
      class="stage-window"
    > 
      <ModalWindow
        :name="`Настройка ${numberSelectedStage} этапа`"
        @close="closeWindow"
      >

        <div class="dates-deadlines">
          <div class="dates-deadlines__title-block">
            <div>
              <img :src="meeting" alt="">
            </div>
            <div>
              <p>Даты и дедлайны</p>
            </div>
          </div>
          <div class="dates-deadlines__content">
            <CalendarBlock
              label="Старт этапа"
              :date="startDate"
              @update:date="date => updateDate(date, 'start')"
            />
            <CalendarBlock
              label="Дедлайн начала этапа"
              :date="opportunityDate"
              @update:date="date => updateDate(date, 'opportunity')"
            />
            <CalendarBlock
              label="Дедлайн отправки всех заданий"
              :date="deadlineAllDate"
              @update:date="date => updateDate(date, 'deadline')"
            />
          </div>
        </div>

        {{ startDate }}
        {{ opportunityDate }}
        {{ deadlineAllDate }}

        <!-- <VDatePicker v-model="startDateValue" />
        <VDatePicker v-model="opportunityDateValue" />
        <VDatePicker v-model="deadlineAllValue" /> -->
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.stage-window {
  width: 668px;
}

.dates-deadlines {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #D0D7E5;
  padding: 20px;
}

.dates-deadlines__title-block {
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}
</style>