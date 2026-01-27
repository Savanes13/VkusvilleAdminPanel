<script lang="ts" setup>
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { ref } from 'vue';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

type TStages = "stage1" | "stage2"

const selectedStage = ref<TStages>('stage1');

const dataSwitch = [
  {
    name: "stage1",
    text: "1 этап"
  },
  {
    name: "stage2",
    text: "2 этап"
  }
];

const ApplicantStab = {
  display_name: "Микрочелик 1",
  grades: {
    1: {
      expert: {
        display_name: "Япи Дор",
        level: 2,
      },
      grades: {
        StructLogic: 2,
        ContentMotivation: 2,
        ProgramGoals: 2
      },
      comment: "коммент"
    },
    2: {
      expert: {
        display_name: "Япи Дор",
        level: 2,
      },
      grades: {
        StructLogic: 2,
        ContentMotivation: 2,
        ProgramGoals: 2
      },
      comment: "коммент"
    },
    3: {
      expert: {
        display_name: "Япи Дор",
        level: 2,
      },
      grades: {
        StructLogic: 2,
        ContentMotivation: 2,
        ProgramGoals: 2
      },
      comment: "коммент"
    }
  },
  pass_info:{
    is_passed: true,
    total_grade: 4.5
  }
}
</script>

<template>
  <div class="applicant-table">

    <div class="applicant-table__title">
      <p>Оценки экспертов</p>
    </div>

    <div class="control-block">
     <DefaultSwitch
        v-model:value="selectedStage"
        :data="dataSwitch"
      />
      <DefaultButton
        class="default-button__size--large default-button__color-green-transparent control-button"
        left-icon="edit"
      >
        Редактировать оценки
      </DefaultButton>
    </div>

    <HeaderTable/>

    <LineTable
      v-for="item in ApplicantStab.grades"
      :data="item"
    />


  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.applicant-table__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}

.control-block {
  display: flex;
  justify-content: space-between;
}

.control-button {
  width: 242px;
  margin-bottom: 20px;
}
</style>