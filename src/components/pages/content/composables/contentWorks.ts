import { changeTextContentAbit, changeTextContentAdmin, getContentAbit, getContentAdmin } from "@/api/pages/content/apiContent";
import { useCompanyStore } from "@/store/company/companyStore";
import type { IInputDefaultProps } from "@/types/inputs/types";
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";

export default function contentWorks () {
  type TBotsType = "technical" | "applicants"

  interface ITableLineItem {
    key: string;
    value: string;
    format_keys: string[];
  }

  const contentPageData = ref<ITableLineItem[] | null>(null);
  const currentPage = ref<number>(1);
  const pageSize = 8;
  const selectedBot = ref<TBotsType>('technical');
  const companyStore = useCompanyStore()

  const searchInputObj = reactive<IInputDefaultProps>({
    value: '',
    label: 'Поиск',
    placeholder: 'Поиск',
    error: {
      show: false,
      text: ''
    },
  });

  const dataSwitch = [
    {
      name: "technical",
      text: "Технический бот"
    },
    {
      name: "applicants",
      text: "Абитуриентский бот"
    }
  ];

  const windowWidth = ref(window.innerWidth);

  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  const dataSwitchResponsive = computed(() => {
    return dataSwitch.map(item => {
      if (windowWidth.value < 500 && item.name === "technical") {
        return { ...item, text: "Тех. бот" };
      }
      return item;
    });
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredContent.value.length / pageSize);
  });

  const paginatedContent = computed<ITableLineItem[]>(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredContent.value.slice(start, end);
  });

  const filteredContent = computed<ITableLineItem[]>(() => {
    const search = searchInputObj.value.trim().toLowerCase();
      if (!contentPageData.value) return [];
      if (!search) return contentPageData.value;
      return contentPageData.value.filter(item =>
      item.value.toLowerCase().includes(search) || item.key.toLowerCase().includes(search)
    );
  });

  const missingLines = computed(() => {
    const pageData = paginatedContent.value;
    const missingRows = pageSize - pageData.length;
    return missingRows;
  });

  watch(() => searchInputObj.value, () => {
    currentPage.value = 1;
  });

  watch(selectedBot, () => {
    currentPage.value = 1;
    getPageData();
  });

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  };

  const getPageData = async () => {
    try {
      if (selectedBot.value === 'technical') {
        const response = await getContentAdmin();
        contentPageData.value = response.items;
      } else {
        const response = await getContentAbit();
        contentPageData.value = response.items;
      };
    } catch (error) {
      console.error("ошибка загрузки данных страницы")
    };
  };
  
  watch(() => companyStore.selectedCompany, () => {
      getPageData()
    },{ immediate: true }
  )

  const changeTextLineTable = async (text: string, key: string) => {
    try {
      if (selectedBot.value === 'technical') {
        await changeTextContentAdmin(text, key);
      } else {
        await changeTextContentAbit(text, key);
      };
      if (contentPageData.value) {
        const changeItem = contentPageData.value.find(item => item.key === key);
        if (changeItem) changeItem.value = text;
      };
    } catch (error) {
      console.error('ошибка обновления текста');
    };
  };

  return {
    contentPageData,
    currentPage,
    selectedBot,
    searchInputObj,
    totalPages,
    paginatedContent,
    missingLines,
    dataSwitchResponsive,
    goToPage,
    changeTextLineTable
  }
}