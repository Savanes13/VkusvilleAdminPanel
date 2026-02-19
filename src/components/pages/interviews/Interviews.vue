<script lang="ts" setup>
import { getContentInterviewsPage } from '@/api/pages/Interviews/apiInterviews';
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import InterviewsTable from './components/table/InterviewsTable.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useCompanyStore } from '@/store/company/companyStore';
import type { TInterviewsData } from '@/types/pages/interviews/typesInterviews';
import InterviewsAddWindow from '@/components/shared/elements/modalWindow/interviews/InterviewsAddWindow.vue';
import { mainIcons } from '@/components/shared/icons/mainIcons';
import DataInterviewWindow from '@/components/shared/elements/modalWindow/interviews/DataInterviewWindow.vue';

interface IAddExpertWindowObj {
  idInterview: number | null;
  arrExpertIds: number[] | null;
}

interface IDataWindowObj {
  id: number | null;
  experts: number[] | null;
  day: string | null;
  data: number | null;
  month: string | null;
  time: number | null;
}

const pageDataArr = ref<null | TInterviewsData>(null);
const selectedWeek = ref<number>(0);
const companyStore = useCompanyStore();
const successBlockIsVisible = ref<boolean>(false);
const visibilityAddExpertWindow = ref<boolean>(false);
const addExpertWindowObj = ref<IAddExpertWindowObj>({
  idInterview: null,
  arrExpertIds: null
});
const visibilityDataWindow = ref<boolean>(false);
const visibilityErrorWeek = ref<boolean>(false);
const dataWindowObj = ref<IDataWindowObj>({
  id: null,
  experts: null,
  day: null,
  data: null,
  month: null,
  time: null
});
const viewportWidth = ref(window.innerWidth);
let hideTimeoutSuccess: number | null = null;
let hideTimeoutError: number | null = null;

const updateWidth = () => {
  viewportWidth.value = window.innerWidth;
};

onUnmounted(() => {
  if (hideTimeoutSuccess) clearTimeout(hideTimeoutSuccess);
  if (hideTimeoutError) clearTimeout(hideTimeoutError);
});

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

const getPageData = async () => {
  try {
    const response = await getContentInterviewsPage(selectedWeek.value);
    pageDataArr.value = [...response.items]
  } catch (error) {
    visibilityErrorWeek.value = true;
    selectedWeek.value = 0;
    if (hideTimeoutError) clearTimeout(hideTimeoutError);
    hideTimeoutError = setTimeout(() => {
      visibilityErrorWeek.value = false;
    }, 4000);
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

const openDataWindow = (id: number, experts: number[], day: string, data: number, month: string, time: number) => {
  visibilityDataWindow.value = true;
  dataWindowObj.value.id = id;
  dataWindowObj.value.experts = experts;
  dataWindowObj.value.day = day;
  dataWindowObj.value.data = data;
  dataWindowObj.value.month = month;
  dataWindowObj.value.time = time;
}

const closeDataWindow = () => {
  visibilityDataWindow.value = false;
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
  successBlockIsVisible.value = true;
  if (hideTimeoutSuccess) clearTimeout(hideTimeoutSuccess);
  hideTimeoutSuccess = setTimeout(() => {
    successBlockIsVisible.value = false;
  }, 4000);
}

const setSelectedWeek = (id: number) => {
  selectedWeek.value = id
}

const closeSuccessBlock = () => {
  successBlockIsVisible.value = false;
  if (hideTimeoutSuccess) {
    clearTimeout(hideTimeoutSuccess);
    hideTimeoutSuccess = null;
  }
}

const closeErrorBlock = () => {
  visibilityErrorWeek.value = false;
  if (hideTimeoutError) {
    clearTimeout(hideTimeoutError);
    hideTimeoutError = null;
  }
}
</script>

<template>
  <div 
    class="interviews"
    v-if="pageDataArr"
  >
    <PageHeader
      hint-text="Календарь слотов собеседований. Цветом показано, сколько экспертов доступно в каждый час. Нажмите на слот, чтобы посмотреть состав экспертов и детали"
      :hint-width="viewportWidth > 374 ? 280 : 160"
      :hint-height="viewportWidth > 374 ? 120 : 200"
    >
      Собеседования
    </PageHeader>
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
          @open-data-window="openDataWindow"
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
    <transition name="fadeFast">
      <DataInterviewWindow
        v-if="viewportWidth < 1001 && visibilityDataWindow"
        :data="dataWindowObj"
        @close="closeDataWindow"
        @open-add-window="openAddExpertWindow"
      />
    </transition>
    <transition name="fadeFast">
      <div 
        class="success-block info-block"
        v-if="successBlockIsVisible"
      >
        <div>
          <span
            v-html="mainIcons['checkCurcle']"
          ></span>
        </div>
        <div>
          <p>Эксперты успешно изменены</p>
        </div>
        <div  
          @click="closeSuccessBlock"
          class="success-block__close info-block__close"
        > 
          <span
            v-html="mainIcons['closeGray']"
          ></span>
        </div>
      </div>
    </transition>
    <transition name="fadeFast">
      <div 
        class="error-block info-block"
        v-if="visibilityErrorWeek"
      >
        <div>
          <span
            v-html="mainIcons['warning']"
          ></span>
        </div>
        <div>
          <p>Вы не можете открыть эту неделю</p>
        </div>
        <div  
          @click="closeErrorBlock"
          class="error-block__close info-block__close"
        > 
          <span
            v-html="mainIcons['closeGray']"
          ></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.interviews {
  margin-bottom: 80px;
}

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

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.interview-table {
  width: 100%;
  min-width: 1100px; 
  border-collapse: collapse;
  padding-bottom: 10px;
}

.table-wrapper::-webkit-scrollbar {
  height: 8px !important;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-track {
  background: color.$colorBackgroundSecondary;
  border-radius: 6px;
  overflow: hidden;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: color.$colorTextTertiary;
  cursor: default !important;
}

.info-block{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 422px;
  position: fixed;
  padding: 16px;
  background: color.$colorBlack;
  border-radius: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextWhite;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.info-block__close {
  cursor: pointer;
}

@media(max-width: 830px) {
  .info-table {
    flex-direction: column;
    align-items: start;
  }

  .weeks {
    padding-left: 24px;
  }
}

@media (max-width: 450px) {
  .success-block {
    width: 310px;
    font-size: 14px;
    line-height: 20px;
    bottom: 70px;
  }
}

@media(max-width: 340px) {
  .weeks__item {
    width: 80px;
  }
}
</style>