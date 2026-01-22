<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import ApplicantManagement from './components/ApplicantManagement.vue';
import applicantWorks from './composables/applicantWorks';
import BreadCumbs from '@/components/shared/elements/BreadCumbs.vue';

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

    
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
</style>