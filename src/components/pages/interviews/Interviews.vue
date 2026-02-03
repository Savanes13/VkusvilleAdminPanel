<script lang="ts" setup>
import { getContentInterviewsPage } from '@/api/pages/Interviews/apiInterviews';
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import InterviewsTable from './components/table/InterviewsTable.vue';
import { ref, watch } from 'vue';
import { useCompanyStore } from '@/store/company/companyStore';
import type { TInterviewsData } from '@/types/pages/interviews/typesInterviews';
import InterviewsAddWindow from '@/components/shared/elements/modalWindow/interviews/InterviewsAddWindow.vue';

interface IAddExpertWindowObj {
  idInterview: number | null;
  arrExpertIds: number[] | null;
}

const pageDataArr = ref<null | TInterviewsData>(null);
const companyStore = useCompanyStore();
const visibilityAddExpertWindow = ref<boolean>(false);
const addExpertWindowObj = ref<IAddExpertWindowObj>({
  idInterview: null,
  arrExpertIds: null
});

const getPageData = async () => {
  try {
    const response = await getContentInterviewsPage();
    pageDataArr.value = response.items;
  } catch (error) {
    console.error('ошибка при получении данных страницы')
  }
}

watch(() => companyStore.selectedCompany, () => {
    getPageData()
  },{ immediate: true }
)

const openAddExpertWindow = (id: number, arrExperts: number[]) => {
  visibilityAddExpertWindow.value = true
  addExpertWindowObj.value.idInterview = id;
  addExpertWindowObj.value.arrExpertIds = arrExperts;
}

const closeAddExpertWindow = () => {
  visibilityAddExpertWindow.value = false
  addExpertWindowObj.value.arrExpertIds = null;
  addExpertWindowObj.value.idInterview = null;
}

const changeExpertsInInrerview = (id: number, arr: number[]) => {
  if (!pageDataArr.value) return
  pageDataArr.value.forEach(day => {
    day.interviews.forEach(interview => {
      if (interview.id === id) {
        interview.reviewer_ids = arr;
      }
    });
  });
}
</script>

<template>
  <div 
    class="interviews"
    v-if="pageDataArr"
  >
    <PageHeader>
      Собеседования
    </PageHeader>

    <div class="interviews__table-wrap">
      <InterviewsTable
        :data="pageDataArr"
        @open-add-window="openAddExpertWindow"
      />
    </div>

    <transition name="fadeFast">
      <InterviewsAddWindow
        v-if="visibilityAddExpertWindow"
        :id="addExpertWindowObj.idInterview"
        :experts="addExpertWindowObj.arrExpertIds"
        @close="closeAddExpertWindow"
        @change-experts="changeExpertsInInrerview"
      />
    </transition>
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