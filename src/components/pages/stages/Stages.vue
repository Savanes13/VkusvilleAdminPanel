<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';

const stabStages = {
  stageFirst: {
    name: "Эссе и кружок",
    deadlines: {
      startDate: {
        date: "2025-09-11",
        stringDate: "11 сентября 2025"
      },
      opportunityDate: {
        date: "2025-09-11",
        stringDate: "11 сентября 2025"
      },
      deadlineAll: {
        date: "2025-09-11",
        stringDate: "11 сентября 2025"
      },
      timeComplete: 3
    },
    evaluation: {
      passingGrade: 44,
      currentRange: {
        min: 0,
        max: 6
      },
      structureLogic: {
        min: 0,
        max: 3
      },
      motivation: {
        min: 0,
        max: 3
      }
    }
  },
  stageSecond: {
    name: "Кейс",
    deadlines: {
      startDate: {
        date: "2025-09-11",
        stringDate: "11 сентября 2025"
      },
      opportunityDate: {
        date: "2025-09-11",
        stringDate: "11 сентября 2025"
      },
      deadlineAll: {
        date: "2025-09-11",
        stringDate: "11 сентября 2025"
      },
      timeComplete: 3
    },
    evaluation: {
      passingGrade: 44,
      currentRange: {
        min: 0,
        max: 6
      },
      structureLogic: {
        min: 0,
        max: 3
      },
      motivation: {
        min: 0,
        max: 3
      }
    }
  },
  stageThird: {
    name: "Собеседования"
  }
}

</script>

<template>
  <div class="stages">
    <PageHeader>
      Этапы
    </PageHeader>
    <div class="stages__items">
      <WrapperBlock>
        <div class="header-stage">
          <div class="header-stage__title">
            <div class="counter">
              <p>Этап 1</p>
            </div>
            <div class="name">
              <p>{{ stabStages.stageFirst.name }}</p>
            </div>
          </div>
          <div class="header-stage__stage-button">
            <DefaultButton 
              class="default-button__color-green-transparent default-button__size--small"
              left-icon="edit"
            >
              Настроить
            </DefaultButton>
          </div>
        </div>
        <div class="info-stage">
          <div class="info-stage__item">
            <div class="title-block">
              <p>Дедлайны</p>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Дата начала этапа</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageFirst.deadlines.startDate.stringDate }}</p>
              </div>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Дедлайн возможности начать этап</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageFirst.deadlines.opportunityDate.stringDate }}</p>
              </div>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Дедлайн отправки всех заданий</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageFirst.deadlines.deadlineAll.stringDate }}</p>
              </div>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Время на выполнение задания</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageFirst.deadlines.timeComplete }}</p>
              </div>
            </div>
          </div>
          <div class="info-stage__item">
            <div class="title-block">
              <p>Оценка</p>
            </div>
            <div class="item-block">
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
            </div>
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
              <p>{{ stabStages.stageSecond.name }}</p>
            </div>
          </div>
          <div class="header-stage__stage-button">
            <DefaultButton 
              class="default-button__color-green-transparent default-button__size--small"
              left-icon="edit"
            >
              Настроить
            </DefaultButton>
          </div>
        </div>
        <div class="info-stage">
          <div class="info-stage__item">
            <div class="title-block">
              <p>Дедлайны</p>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Дата начала этапа</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageSecond.deadlines.startDate.stringDate }}</p>
              </div>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Дедлайн возможности начать этап</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageSecond.deadlines.opportunityDate.stringDate }}</p>
              </div>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Дедлайн отправки всех заданий</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageSecond.deadlines.deadlineAll.stringDate }}</p>
              </div>
            </div>
            <div class="item-block">
              <div class="item-block__name">
                <p>Время на выполнение задания</p>
              </div>
              <div class="item-block__text">
                <p>{{ stabStages.stageSecond.deadlines.timeComplete }}</p>
              </div>
            </div>
          </div>
          <div class="info-stage__item">
            <div class="title-block">
              <p>Оценка</p>
            </div>
            <div class="item-block">
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
            </div>
          </div>
        </div>
      </WrapperBlock>
      <WrapperBlock>
        <div class="header-stage">
          <div class="header-stage__title">
            <div class="counter">
              <p>Этап 3</p>
            </div>
            <div class="name">
              <p>{{ stabStages.stageThird.name }}</p>
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
  </div>
</template>

<style>
.stages__items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header-stage {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header-stage__stage-button {
  width: 145px;
}

.counter {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #333333;
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
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #333333;
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