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
            <DefaultButton class="default-button__color-green-transparent default-button__size--small">
              Настроить
            </DefaultButton>
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
            <DefaultButton class="default-button__color-green-transparent default-button__size--small">
              Настроить
            </DefaultButton>
          </div>
        </div>
      </WrapperBlock>
  
  
      <WrapperBlock>
        
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
</style>