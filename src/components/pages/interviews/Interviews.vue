<script lang="ts" setup>
import { getContentInterviewsPage } from '@/api/pages/Interviews/apiInterviews';
import PageHeader from '@/components/shared/elements/PageHeader.vue';

const getPageData = async () => {
  try {
    const response = await getContentInterviewsPage();
    // pageDataArr.value = response.items;
  } catch (error) {
    console.error('ошибка при получении данных страницы')
  }
}
getPageData();
</script>

<template>
  <div class="interviews">
    <PageHeader>
      Собеседования
    </PageHeader>
  </div>
</template>

<style lang="scss" scoped>

</style>