<script lang="ts" setup>
import { getContentInterviewsPage } from '@/api/pages/Interviews/apiInterviews';
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import InterviewsTable from './components/table/InterviewsTable.vue';

const getPageData = async () => {
  try {
    const response = await getContentInterviewsPage();
    // pageDataArr.value = response.items;
  } catch (error) {
    console.error('ошибка при получении данных страницы')
  }
}
getPageData();



const arr = [
  {
    day: 1769317200000,
    interviews: [
      {
        start_time: 1769774400000,
        reviewer_ids: [22, 4]
      },
      {
        start_time: 1773651600000,
        reviewer_ids: []
      }
    ]
  },
  {
    day: 1769403600000,
    interviews: [
      {
        start_time: 1769749200000,
        reviewer_ids: [43]
      },
      {
        start_time: 1773651600000,
        reviewer_ids: [11]
      }
    ]
  },
  {
    day: 1769490000000,
    interviews: [
      {
        start_time: 1769749200000,
        reviewer_ids: [43]
      },
      {
        start_time: 1773651600000,
        reviewer_ids: [11]
      }
    ]
  },
  {
    day: 1769576400000,
    interviews: [
      {
        start_time: 1769749200000,
        reviewer_ids: [43, 22, 33]
      },
      {
        start_time: 1769774400000,
        reviewer_ids: []
      }
    ]
  },
  {
    day: 1769662800000,
    interviews: [
      {
        start_time: 1769749200000,
        reviewer_ids: [43]
      },
      {
        start_time: 1769774400000,
        reviewer_ids: [11, 499, 43]
      }
    ]
  },
]
</script>

<template>
  <div class="interviews">
    <PageHeader>
      Собеседования
    </PageHeader>

    <div class="interviews__table-wrap">

      <InterviewsTable
        :data="arr"
      />

    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.interviews__table-wrap {
  background: color.$colorIconWhite;
  border-radius: 24px;
  padding-bottom: 20px;
}
</style>