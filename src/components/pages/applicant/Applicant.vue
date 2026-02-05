<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import ApplicantManagement from './components/ApplicantManagement.vue';
import applicantWorks from './composables/applicantWorks';
import BreadCumbs from '@/components/shared/elements/BreadCumbs.vue';
import FirstStageTable from './components/table/firstStageTable/FirstStageTable.vue';
import SecondStageTable from './components/table/secondStageTable/SecondStageTable.vue';
import FinalAssessment from './components/FinalAssessment.vue';

const {
  breadCrumb
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
      <!-- <FirstStageTable
        class="applicant-table"
      /> -->

      <SecondStageTable
        class="applicant-table"
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

@media (max-width: 768px) {
  .applicant__bread-crumbs {
    margin-left: 24px;
  }
}
</style>