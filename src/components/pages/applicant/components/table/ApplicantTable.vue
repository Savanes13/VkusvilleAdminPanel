<script lang="ts" setup>
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { ref } from 'vue';

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

const ApplicantStab = [
  {
    
  }
]
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
  align-items: center;
}

.control-button {
  width: 242px;
  margin-bottom: 20px;
}
</style>