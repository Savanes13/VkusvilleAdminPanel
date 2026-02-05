<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import ApplicantManagement from './components/ApplicantManagement.vue';
import applicantWorks from './composables/applicantWorks';
import BreadCumbs from '@/components/shared/elements/BreadCumbs.vue';
import FirstStageTable from './components/table/firstStageTable/FirstStageTable.vue';
import SecondStageTable from './components/table/secondStageTable/SecondStageTable.vue';
import FinalAssessment from './components/FinalAssessment.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';

const {
  breadCrumb,
  selectedStage,
  dataSwitch,
  editingIsActive,
  activateEditing,
  finishEditing
} = applicantWorks();
</script>

<template>
  <div class="applicant">
    <div class="applicant__bread-crumbs">
      <BreadCumbs
        :data="breadCrumb"
      />
    </div>
    <PageHeader>
      Имя Абитуриента
    </PageHeader>

    <WrapperBlock class="applicant__management">
      <ApplicantManagement
        
      />
    </WrapperBlock>


    <WrapperBlock>

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


      <FirstStageTable
        class="applicant-table"
        v-if="selectedStage === 'stage1'"
        :editing-is-active="editingIsActive"
        :selected-stage="selectedStage"
        @finish-editing="finishEditing"
      />
      <SecondStageTable
        class="applicant-table"
        v-else
        :editing-is-active="editingIsActive"
        :selected-stage="selectedStage"
        @finish-editing="finishEditing"
      /> 

      <FinalAssessment/>
    </WrapperBlock>


  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.applicant__management {
  margin-bottom: 24px;
}

.applicant-table {
  margin-bottom: 20px;
}

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

@media (max-width: 800px) {
  .control-button {
    width: 232px;
  }
}

@media (max-width: 768px) {
  .applicant__bread-crumbs {
    margin-left: 24px;
  }
}

@media (max-width: 475px) {
  .control-block {
    flex-direction: column;
    align-items: start;
    gap: 16px;
  }
}
</style>