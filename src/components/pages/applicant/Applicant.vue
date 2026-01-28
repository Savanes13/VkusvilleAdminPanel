<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import ApplicantManagement from './components/ApplicantManagement.vue';
import applicantWorks from './composables/applicantWorks';
import BreadCumbs from '@/components/shared/elements/BreadCumbs.vue';
import ApplicantTable from './components/table/ApplicantTable.vue';

const {
  breadCrumb
} = applicantWorks();
</script>

<template>
  <div class="applicant">
    <BreadCumbs
      :data="breadCrumb"
    />
    <PageHeader>
      Имя Абитуриента
    </PageHeader>
    <WrapperBlock class="applicant__management">
      <ApplicantManagement/>
    </WrapperBlock>

    <WrapperBlock>
      <ApplicantTable
        
      />
    </WrapperBlock>
    
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.applicant__management {
  margin-bottom: 24px;
}
</style>