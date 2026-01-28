<script lang="ts" setup>
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { ref } from 'vue';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

type TStages = "stage1" | "stage2"

const selectedStage = ref<TStages>('stage1');
const editingIsActive = ref<boolean>(false);

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
        level: 1,
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

const activateEditing = () => {
  editingIsActive.value = true;
};

const finishEditing = () => {
  editingIsActive.value = false;
};
</script>

<template>
  <div class="applicant-table">

    <div class="applicant-table__title">
      <p>Оценки экспертов</p>
    </div>

    <div class="control-block">
     <DefaultSwitch
        class="switch-item"
        v-model:value="selectedStage"
        :data="dataSwitch"
      />
      <DefaultButton
        v-if="!editingIsActive"
        class="default-button__size--large default-button__color-green-transparent control-button"
        left-icon="edit"
        @click="activateEditing"
      >
        Редактировать оценки
      </DefaultButton>
    </div>

    <HeaderTable/>

    <LineTable
      v-for="item in ApplicantStab.grades"
      :data="item"
      :editing-is-active="editingIsActive"
    />

    <div class="save-block">
      <div 
        class="save-block__buttons"
        v-if="editingIsActive"
      >
        <DefaultButton
          class="default-button__size--large default-button__color-gray button-management"
          @click="finishEditing"
        >
          Отменить
        </DefaultButton>
        <DefaultButton
          class="default-button__size--large default-button__color-green button-management"
        >
          Сохранить
        </DefaultButton>
      </div>
    </div>

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
  margin-bottom: 20px;
}

.control-button {
  width: 242px;
}

.switch-item {
  margin-bottom: 2px;
}

.save-block {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 68px;
  border-left: 1px solid #DDE0E8;
  border-right: 1px solid #DDE0E8;
  border-bottom: 1px solid #DDE0E8;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 12px;
}

.save-block__buttons {
  display: flex;
  gap: 16px;
}

.button-management {
  width: 200px;
}
</style>