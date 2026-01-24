<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../../ModalWindow.vue';
import meeting from '@/assets/images/mainIcons/meeting.svg';
import one from '@/assets/images/mainIcons/one.svg';
import CalendarBlock from './components/CalendarBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';

interface IStageWindowProps {
  startDate: number
  opportunityDate: number
  deadlineAllDate: number
  numberSelectedStage: number

  structLogic: number[];
};

const {
  startDate,
  opportunityDate,
  deadlineAllDate,
  numberSelectedStage,

  structLogic
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

function timestampToDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  
  // Месяц и день делаем двухзначными
  const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0 до 11
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
</script>

<template>
  <BackgroundModal>
    <div 
      class="stage-window"
      v-clickOutside="closeWindow"
    > 
      <ModalWindow
        :name="`Настройка ${numberSelectedStage} этапа`"
        @close="closeWindow"
      >

        <div class="dates-deadlines wrap-block">
          <div class="dates-deadlines__title-block wrap-block__title">
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
              :date="timestampToDateString(startDate)"
              @update:date="date => updateDate(date, 'start')"
            />
            <CalendarBlock
              label="Дедлайн начала этапа"
              :date="timestampToDateString(opportunityDate)"
              @update:date="date => updateDate(date, 'opportunity')"
            />
            <CalendarBlock
              label="Дедлайн отправки всех заданий"
              :date="timestampToDateString(deadlineAllDate)"
              @update:date="date => updateDate(date, 'deadline')"
            />
          </div>
        </div>

        <div class="estimation wrap-block">
          <div class="estimation__title-block wrap-block__title">
            <div>
              <img :src="one" alt="">
            </div>
            <div>
              <p>Оценка</p>
            </div>
          </div>

          <div class="range-estimates">
            <p>Текущий диапазон оценки — от 0 до 9</p>
          </div>

          <div>


            <div 
              v-for="item in structLogic"
            >
              <p>{{ item }}</p>
            </div>
        

          </div>
        </div>

        <div class="buttons-block">
          <DefaultButton
             class="default-button__size--large default-button__color-gray"
          >
            Отменить
          </DefaultButton>
          <DefaultButton
            class="default-button__size--large default-button__color-green"
          >
            Сохранить
          </DefaultButton>
        </div>

        <!-- {{ startDate }}
        {{ opportunityDate }}
        {{ deadlineAllDate }} -->

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

.wrap-block {
  width: 100%;
  border-radius: 16px;
  border: 1px solid #D0D7E5;
  padding: 20px;
  margin-bottom: 24px;
}

.wrap-block__title {
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}

.estimation__title-block {
  margin-bottom: 8px;
}

.dates-deadlines__content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.buttons-block {
  display: flex;
  gap: 16px;
}

.range-estimates {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
  margin-bottom: 20px
}
</style>