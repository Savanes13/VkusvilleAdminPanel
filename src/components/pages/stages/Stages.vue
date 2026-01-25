<script lang="ts" setup>
import FirstStageWindow from '@/components/shared/elements/modalWindow/stages/firstStageWindow/FirstStageWindow.vue';
import SecondStageWindow from '@/components/shared/elements/modalWindow/stages/secondStageWindow/SecondStageWindow.vue';
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import meeting from '@/assets/images/mainIcons/meeting.svg';
import one from '@/assets/images/mainIcons/one.svg';
import { reactive, ref } from 'vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';

const stageWindowVisibility = ref<boolean>(false);
const numberSelectedStage = ref<number>(0);

const stabStages = reactive([
  {
    stage_id: 1,
    stage_key: "STAGE_1",
    deadlines: {
      start_date: 1747200000000,
      start_utill: 1747200000000,
      send_until: 1747200000000,
      time_to_complete: 3
    },
    grades:
    [
      {
        criteria: "StructLogic",
        grades: [0, 1, 2, 3, 6, 7, 8, 9]
      },
      {
        criteria: "ContentMotivation",
        grades: [0, 1, 2, 3, 4]
      },
      {
        criteria: "ProgramGoals",
        grades: [0, 1, 2, 3, 4]
      },
    ],
    grade_mul: 1.0,
    min_grade_to_pass: 10
  },
  {
    stage_id: 2,
    stage_key: "STAGE_2",
    deadlines: {
      start_date: 1747200000000,
      start_utill: 1747200000000,
      send_until: 1747200000000,
      time_to_complete: 3
    },
    grades:
    [
      {
        criteria: "Integrity",
        grades: [0, 1, 2, 3, 4]
      },
      {
        criteria: "Arguments",
        grades: [0, 1, 2, 3, 4]
      },
      {
        criteria: "RealisticMeaningful",
        grades: [0, 1, 2, 3, 4]
      },
      {
        criteria: "Original",
        grades: [0, 1, 2, 3, 4]
      },
      
    ],
    grade_mul: 1.0,
    min_grade_to_pass: 10
  },
])

const closeStageWindow = () => {
  stageWindowVisibility.value = false;
  numberSelectedStage.value = 0;
}

const openStageWindow = (number: number) => {
  stageWindowVisibility.value = true;
  numberSelectedStage.value = number;
}

const formatTimestamp = (ts: number) => {
  const date = new Date(ts)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  .format(date)
  .replace(' г.', '')
}
</script>

<template>
  <div class="stages">
    <PageHeader>
      Этапы
    </PageHeader>
    <div class="stages__items">
      <div class="wrap-editable">
        <WrapperBlock>
          <div class="header-stage">
            <div class="header-stage__title">
              <div class="counter">
                <p>Этап 1</p>
              </div>
              <div class="name">
                <!-- <p>{{ stabStages }}</p> -->
              </div>
            </div>
            <IconButton
              class="button-icon__color-green-transparent"
              icon="edit"
              color-icon="transparent"
              @click="openStageWindow(1)"
            />
          </div>
          <div class="info-stage">
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="meeting" alt="">
                </div>
                <div>
                  <p>Даты и дедлайны</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дата начала этапа</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[0]?.deadlines.start_date ? formatTimestamp(stabStages[0].deadlines.start_date) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн возможности начать этап</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[0]?.deadlines.start_utill ? formatTimestamp(stabStages[0]?.deadlines.start_utill) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн отправки всех заданий</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[0]?.deadlines.send_until ? formatTimestamp(stabStages[0]?.deadlines.send_until) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Время на выполнение задания</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[0]?.deadlines.time_to_complete }} дня</p>
                </div>
              </div>
            </div>
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="one" alt="">
                </div>
                <div>
                  <p>Оценка</p>
                </div>
              </div>
              <!-- <div class="item-block">
                <div class="item-block__name">
                  <p>Проходной балл</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageFirst.evaluation.passingGrade }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Текущий диапазон оценки</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageFirst.evaluation.currentRange.min }}–{{ stabStages.stageFirst.evaluation.currentRange.max }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оценки стуктуры и логики</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageFirst.evaluation.structureLogic.min }}–{{ stabStages.stageFirst.evaluation.structureLogic.max }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оценки мотивации</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageFirst.evaluation.motivation.min }}–{{ stabStages.stageFirst.evaluation.motivation.max }}</p>
                </div>
              </div> -->
            </div>
          </div>
        </WrapperBlock>
        <WrapperBlock>
          <div class="header-stage">
            <div class="header-stage__title">
              <div class="counter">
                <p>Этап 2</p>
              </div>
              <div class="name">
                <!-- <p>{{ stabStages.stageSecond.name }}</p> -->
              </div>
            </div>
            <IconButton
              class="button-icon__color-green-transparent"
              icon="edit"
              color-icon="transparent"
              @click="openStageWindow(2)"
            />
          </div>
          <div class="info-stage">
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="meeting" alt="">
                </div>
                <div>
                  <p>Даты и дедлайны</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дата начала этапа</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[1]?.deadlines.start_date ? formatTimestamp(stabStages[1]?.deadlines.start_date) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн возможности начать этап</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[1]?.deadlines.start_utill ? formatTimestamp(stabStages[1]?.deadlines.start_utill) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн отправки всех заданий</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[1]?.deadlines.send_until ? formatTimestamp(stabStages[1]?.deadlines.send_until) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Время на выполнение задания</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages[1]?.deadlines.time_to_complete }} дня</p>
                </div>
              </div>
            </div>
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="one" alt="">
                </div>
                <div>
                  <p>Оценка</p>
                </div>
              </div>
              <!-- <div class="item-block">
                <div class="item-block__name">
                  <p>Проходной балл</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageSecond.evaluation.passingGrade }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Текущий диапазон оценки</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageSecond.evaluation.currentRange.min }}–{{ stabStages.stageSecond.evaluation.currentRange.max }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оценки стуктуры и логики</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageSecond.evaluation.structureLogic.min }}–{{ stabStages.stageSecond.evaluation.structureLogic.max }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оценки мотивации</p>
                </div>
                <div class="item-block__text">
                  <p>{{ stabStages.stageSecond.evaluation.motivation.min }}–{{ stabStages.stageSecond.evaluation.motivation.max }}</p>
                </div>
              </div> -->
            </div>
          </div>
        </WrapperBlock>
      </div>
      <WrapperBlock>
        <div class="header-stage">
          <div class="header-stage__title">
            <div class="counter">
              <p>Этап 3</p>
            </div>
            <div class="name">
              <!-- <p>{{ stabStages.stageThird.name }}</p> -->
            </div>
          </div>
        </div>
        <div class="not-configurable">
          <p>Этот этап не настраивается</p>
        </div>
        <div class="interview-button">
          <DefaultButton 
            class="default-button__color-green-transparent default-button__size--small"
            right-icon="chevronRight"
          >
            К собеседованиям
          </DefaultButton>
        </div>
      </WrapperBlock>
    </div>

    <!-- {{ stabStages.stageFirst.deadlines.startDate.date }} -->
      <FirstStageWindow
        v-if="stageWindowVisibility && numberSelectedStage === 1 && stabStages[0]"
        :data="stabStages[0]"
        @close="closeStageWindow"
      />

      <!-- <SecondStageWindow
        v-if="stageWindowVisibility && numberSelectedStage === 2"

        :data=""

        @close="closeStageWindow"
      /> -->

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.stages__items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wrap-editable {
  display: flex;
  gap: 24px;
}

.header-stage {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.counter {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: color.$colorTextSecondary;
  margin-bottom: 8px;
}

.name {
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: #333333;
}

.info-stage {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-stage__item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #D0D7E5;
  padding: 20px;
}

.title-block {
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.item-block {
  display: flex;
  justify-content: space-between;
}

.item-block__text {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
}

.item-block__name {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #747F9C;
}

.not-configurable {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #333333;
  margin-bottom: 20px;
}

.interview-button {
  width: 210px;
}
</style>