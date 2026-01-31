<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../../ModalWindow.vue';
import meeting from '@/assets/images/mainIcons/meeting.svg';
import one from '@/assets/images/mainIcons/one.svg';
import CalendarBlock from '../components/CalendarBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import ScoreButton from '../components/ScoreButton.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import firstStageWindowWorks from './composables/firstStageWindowWorks';
import type { IStage } from '@/types/pages/stages/typesStages';

const emit = defineEmits<{
  (e: 'close'): void;
  (e:"setNewObj", obj: IStage): void;
}>();

const props = defineProps<{ data: IStage }>()

const {
  localStage,
  timeToCompleteStr,
  gradeMulStr,
  minGradePass,
  dayToWorkInputObj,
  multiplierInputObj,
  passingGradeInputObj,
  structLogic,
  contentMotivation,
  programGoals,
  readyToSendDateAfterPrepatch,
  objPrepathData,
  changeStageData,
  closeWindow,
  timestampToDateString,
  updateDate,
  addNewScore
} = firstStageWindowWorks(props, emit);
</script>

<template>
  <BackgroundModal>
    <div 
      class="stage-window"
      v-clickOutside="closeWindow"
    > 
      <ModalWindow
        :name="`Настройка ${1} этапа`"
        @close="closeWindow"
        :have-mobile-type="true"
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
              :date="timestampToDateString(localStage.deadlines.start_until)"
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
              :small-mobile="true"
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
              <p>Структура и логика</p>
            </div>
            <div class="score-block__items">
              <ScoreButton
                v-for="(item, index) in 10"
                :number="index"
                :key="index"
                :activity="structLogic.includes(index)"
                @click="addNewScore('StructLogic', index)"
              />
            </div>
          </div>
          <div class="score-block">
            <div class="score-block__title">
              <p>Содержательность и мотивация</p>
            </div>
            <div class="score-block__items">
              <ScoreButton
                v-for="(item, index) in 10"
                :number="index"
                :key="index"
                :activity="contentMotivation.includes(index)"
                @click="addNewScore('ContentMotivation', index)"
              />
            </div>
          </div>
          <div class="score-block">
            <div class="score-block__title">
              <p>Цели и связь с программой</p>
            </div>
            <div class="score-block__items">
              <ScoreButton
                v-for="(item, index) in 10"
                :number="index"
                :key="index"
                :activity="programGoals.includes(index)"
                @click="addNewScore('ProgramGoals', index)"
              />
            </div>
          </div>
          <div class="block-multiplier">
            <DefaultInput
              v-model:value="gradeMulStr"
              :label="multiplierInputObj.label"
              :placeholder="multiplierInputObj.placeholder"
              :error="multiplierInputObj.error"
              :small-mobile="true"
            />
            <DefaultInput
              v-model:value="minGradePass"
              :label="passingGradeInputObj.label"
              :placeholder="passingGradeInputObj.placeholder"
              :error="passingGradeInputObj.error"
              :small-mobile="true"
            />
          </div>
        </div>
        <transition name="fadeFast">
          <div 
            class="warning-block"
            v-if="readyToSendDateAfterPrepatch"
          >
            <div class="warning-block__title">
              <p>Вы уверены?</p>
            </div>
            <div 
              class="warning-block__text"
              v-if="objPrepathData?.students_extend"
            >
              <p>После изменения дат {{ objPrepathData?.students_extend }} студентов снова смогут выполнить задание</p>
            </div>
            <div 
              class="warning-block__text"
              v-if="objPrepathData?.students_stop"
            >
              <p>После изменения дат у {{ objPrepathData?.students_stop }} студентов сократятся дедлайны</p>
            </div>
          </div>
        </transition>
        <div class="buttons-block">
          <DefaultButton
             class="default-button__size--large default-button__color-gray"
             @click="closeWindow"
          >
            Отменить
          </DefaultButton>
          <DefaultButton
            class="default-button__size--large default-button__color-green"
            @click="changeStageData"
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