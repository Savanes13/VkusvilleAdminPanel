import { getApplicantsPage } from "@/api/pages/applicants/apiApplicants";
import { useCompanyStore } from "@/store/company/companyStore";
import type { IInputDefaultProps } from "@/types/inputs/types";
import { computed, reactive, ref, watch } from "vue";

export default function applicantsWorks () {
  interface IUser {
    id: number;
    display_name: string;
    telegram_id: string;
    stage: number;
    display_grade: number;
    deadline_expired: boolean;
  }

  const contentPageData = ref<null | IUser[]>(null);
  const overdueDeadlineSortActivity = ref<boolean>(false);
  const companyStore = useCompanyStore();
  const currentPage = ref<number>(1);
  const pageSize = 8;

  const searchInputObj = reactive<IInputDefaultProps>({
    value: '',
    label: 'Поиск',
    placeholder: 'Поиск',
    error: {
      show: false,
      text: ''
    },
  });

  const missingLines = computed(() => {
    const pageData = paginatedContent.value;
    const missingRows = pageSize - pageData.length;
    return missingRows;
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredContent.value.length / pageSize);
  });

  const paginatedContent = computed<IUser[]>(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredContent.value.slice(start, end);
  });

  const filteredContent = computed<IUser[]>(() => {
    if (!contentPageData.value) return [];
    const search = searchInputObj.value.trim().toLowerCase();
    let result = contentPageData.value;
    if (search) {
      result = result.filter(item =>
        item.display_name.toLowerCase().includes(search) ||
        item.telegram_id.toLowerCase().includes(search)
      );
    }
    if (overdueDeadlineSortActivity.value) {
      result = result.filter(item => item.deadline_expired === true);
    }
    return result;
  });

  watch(() => searchInputObj.value, () => {
    currentPage.value = 1;
  });

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  };

  const getPageData = async () => {
    try {
      const response = await getApplicantsPage();
      contentPageData.value = response.items;
    } catch (error) {
      console.error("ошибка загрузки данных страницы")
    };
  };
  
  watch(() => companyStore.selectedCompany, () => {
      getPageData()
    },{ immediate: true }
  )

  return {
    paginatedContent,
    searchInputObj,
    totalPages,
    currentPage,
    overdueDeadlineSortActivity,
    goToPage,
    missingLines
  }
}