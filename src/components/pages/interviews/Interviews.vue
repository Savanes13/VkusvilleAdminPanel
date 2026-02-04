<script lang="ts" setup>
import { getContentInterviewsPage } from '@/api/pages/Interviews/apiInterviews';
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import InterviewsTable from './components/table/InterviewsTable.vue';
import { computed, ref, watch } from 'vue';
import { useCompanyStore } from '@/store/company/companyStore';
import type { TInterviewsData } from '@/types/pages/interviews/typesInterviews';
import InterviewsAddWindow from '@/components/shared/elements/modalWindow/interviews/InterviewsAddWindow.vue';

interface IAddExpertWindowObj {
  idInterview: number | null;
  arrExpertIds: number[] | null;
}

const pageDataArr = ref<null | TInterviewsData>(null);
const selectedWeek = ref<number>(0);
const companyStore = useCompanyStore();
const visibilityAddExpertWindow = ref<boolean>(false);
const addExpertWindowObj = ref<IAddExpertWindowObj>({
  idInterview: null,
  arrExpertIds: null
});

const getPageData = async () => {
  try {
    const response = await getContentInterviewsPage(selectedWeek.value);
    pageDataArr.value = [...response.items]
  } catch (error) {
    console.error('ошибка при получении данных страницы')
  }
}

watch(() => companyStore.selectedCompany, () => {
    getPageData()
  },{ immediate: true }
)

watch(selectedWeek, (newWeek, oldWeek) => {
  getPageData()
})

const monthsArr = computed(() => {
  if (!pageDataArr.value) return [];
  const set = new Set<string>();
  pageDataArr.value.forEach(dayObj => {
    const date = new Date(dayObj.day);
    const monthName = date.toLocaleString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    set.add(`${monthName} ${year}`);
  });
  return Array.from(set);
});

const capitalize = (str?: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

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

const setSelectedWeek = (id: number) => {
  selectedWeek.value = id
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


    <!-- {{ pageDataArr }} -->

    <div class="interviews__table-wrap">

      <div class="info-table">
        <div class="months">
          <p v-if="monthsArr.length === 1">{{ capitalize(monthsArr[0]) }}</p>
          <p v-else>{{ monthsArr.map(capitalize).join(' - ') }}</p>
        </div>

        <div class="weeks">
          <div
            class="weeks__item"
            :class="{'weeks__item--active' : selectedWeek === 0}"
            @click="setSelectedWeek(0)"
          >
            <p>1 неделя</p>
          </div>
          <div
            class="weeks__item"
            :class="{'weeks__item--active' : selectedWeek === 1}"
            @click="setSelectedWeek(1)"
          >
            <p>2 неделя</p>
          </div>
          <div
            class="weeks__item"
            :class="{'weeks__item--active' : selectedWeek === 2}"
            @click="setSelectedWeek(2)"
          >
            <p>3 неделя</p>
          </div>
        </div>
      </div>

      <div class="table-wrapper">
        <InterviewsTable
          v-if="pageDataArr.length != 0"
          class="interview-table"
          :key="selectedWeek"
          :data="pageDataArr"
          @open-add-window="openAddExpertWindow"
        />

        <div 
          v-else
          class="empty-week"
        >
          <p>Эта неделя пуста</p>
        </div>
      </div>

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
@use "@/style/variables/transition.scss" as transition;

.interviews__table-wrap {
  background: color.$colorIconWhite;
  border-radius: 24px;
  padding-bottom: 20px;
}

.info-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.months {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  padding-top: 32px;
  padding-left: 24px;
  margin-bottom: 8px;
}

.weeks {
  display: flex;
  gap: 8px;
  padding-top: 24px;
  padding-right: 24px;
}

.weeks__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 40px;
  border-radius: 12px;
  background: color.$colorBackgroundAccentAlternative;
  color: color.$colorTextAcccent;
  cursor: pointer;
  transition: background-color transition.$medium;
}

.weeks__item:hover {
  background: color.$colorBackgroundAccentAlternative_Hover;
}

.weeks__item--active {
  background: color.$colorStrokeAccent;
  color: color.$colorTextWhite;
}

.weeks__item--active:hover {
  background: color.$colorBackgroundAccent_Hover;
}

.empty-week {
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  text-align: center;
  padding: 20px 0px;
}
</style>