<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../../ModalWindow.vue';
import meeting from '@/assets/images/mainIcons/meeting.svg';
import one from '@/assets/images/mainIcons/one.svg';
import CalendarBlock from '../components/CalendarBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import ScoreButton from '../components/ScoreButton.vue';
import secondStageWindowWorks from './composables/secondStageWindowWorks';

interface Deadline {
  start_date: number;
  start_utill: number;
  send_until: number;
  time_to_complete: number;
}

interface GradeCriteria {
  criteria: string
  grades: number[];
}

export interface Stage {
  stage_id: number;
  stage_key: string;
  deadlines: Deadline;
  grades: GradeCriteria[];
  grade_mul: number;
  min_grade_to_pass: number;
}

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const props = defineProps<{ data: Stage }>()

const {
  localStage,
  timeToCompleteStr,
  gradeMulStr,
  minGradePass,
  dayToWorkInputObj,
  multiplierInputObj,
  passingGradeInputObj,
  integrity,
  argument,
  realisticMeaningful,
  original,
  closeWindow,
  timestampToDateString,
  updateDate,
  addNewScore
} = secondStageWindowWorks(props, emit);
</script>

<template>
  <BackgroundModal>
    <div 
      class="stage-window"
      > 
      <!-- v-clickOutside="closeWindow" -->
      <ModalWindow
        :name="`Настройка ${2} этапа`"
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
              :date="timestampToDateString(localStage.deadlines.start_date)"
              @update:date="date => updateDate(date, 'start')"
            />
            <CalendarBlock
              label="Дедлайн начала этапа"
              :date="timestampToDateString(localStage.deadlines.start_utill)"
              @update:date="date => updateDate(date, 'opportunity')"
            />
            <CalendarBlock
              label="Дедлайн отправки всех заданий"
              :date="timestampToDateString(localStage.deadlines.send_until)"
              @update:date="date => updateDate(date, 'deadline')"
            />
            <DefaultInput
              v-model:value="timeToCompleteStr"
              :label="dayToWorkInputObj.label"
              :placeholder="dayToWorkInputObj.placeholder"
              :error="dayToWorkInputObj.error"
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
          <div class="score-block">
            <div class="score-block__title">
              <p>Целостность решения</p>
            </div>
            <div class="score-block__items">
              <ScoreButton
                v-for="(item, index) in 10"
                :number="index"
                :key="index"
                :activity="integrity.includes(index)"
                @click="addNewScore('Integrity', index)"
              />
            </div>
          </div>
          <div class="score-block">
            <div class="score-block__title">
              <p>Аргументация предложенного решения</p>
            </div>
            <div class="score-block__items">
              <ScoreButton
                v-for="(item, index) in 10"
                :number="index"
                :key="index"
                :activity="argument.includes(index)"
                @click="addNewScore('Arguments', index)"
              />
            </div>
          </div>
          <div class="score-block">
            <div class="score-block__title">
              <p>Реалистичность и здравый смысл</p>
            </div>
            <div class="score-block__items">
              <ScoreButton
                v-for="(item, index) in 10"
                :number="index"
                :key="index"
                :activity="realisticMeaningful.includes(index)"
                @click="addNewScore('RealisticMeaningful', index)"
              />
            </div>
          </div>
          <div class="score-block">
            <div class="score-block__title">
              <p>Оригинальность подхода</p>
            </div>
            <div class="score-block__items">
              <ScoreButton
                v-for="(item, index) in 10"
                :number="index"
                :key="index"
                :activity="original.includes(index)"
                @click="addNewScore('Originals', index)"
              />
            </div>
          </div>
          <div class="block-multiplier">
            <DefaultInput
              v-model:value="gradeMulStr"
              :label="multiplierInputObj.label"
              :placeholder="multiplierInputObj.placeholder"
              :error="multiplierInputObj.error"
            />
            <DefaultInput
              v-model:value="minGradePass"
              :label="passingGradeInputObj.label"
              :placeholder="passingGradeInputObj.placeholder"
              :error="passingGradeInputObj.error"
            />
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
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
@use "./../styles/style.scss";
</style>