import type { IInputDefaultProps } from "@/types/inputs/types";
import { computed, reactive, ref } from "vue";

export default function applicantsWorks () {
  interface IUser {
    id: number;
    fio: string;
    telegram_id: string;
    stage: number;
    scores: number;
    deadline: boolean;
  }

  const contentPageData = ref<null | IUser[]>(null);
  const overdueDeadlineSortActivity = ref<boolean>(false);

  const pageStab = [
    {
      id: 1,
      fio: "Байнов Руслан Сергеевич",
      telegram_id: "rusla",
      stage: 2,
      scores: 100,
      deadline: true
    },
    {
      id: 2,
      fio: "Иванов Иван Петрович",
      telegram_id: "ivanov_ip",
      stage: 1,
      scores: 85,
      deadline: false
    },
    {
      id: 3,
      fio: "Смирнова Анна Андреевна",
      telegram_id: "anna_smir",
      stage: 3,
      scores: 120,
      deadline: true
    },
    {
      id: 4,
      fio: "Кузнецов Дмитрий Олегович",
      telegram_id: "kuz_dmitry",
      stage: 2,
      scores: 95,
      deadline: false
    },
    {
      id: 5,
      fio: "Павлова Екатерина Ильинична",
      telegram_id: "katya_pav",
      stage: 4,
      scores: 140,
      deadline: true
    },
    {
      id: 6,
      fio: "Орлов Максим Денисович",
      telegram_id: "orlov_max",
      stage: 1,
      scores: 70,
      deadline: false
    },
    {
      id: 7,
      fio: "Федорова Мария Алексеевна",
      telegram_id: "maria_fed",
      stage: 3,
      scores: 110,
      deadline: true
    },
    {
      id: 8,
      fio: "Захаров Артём Игоревич",
      telegram_id: "zakharov_ai",
      stage: 2,
      scores: 90,
      deadline: false
    },
    {
      id: 9,
      fio: "Волкова Елена Сергеевна",
      telegram_id: "volkova_es",
      stage: 4,
      scores: 150,
      deadline: true
    },
    {
      id: 10,
      fio: "Никитин Алексей Романович",
      telegram_id: "nikitin_ar",
      stage: 1,
      scores: 60,
      deadline: false
    }
  ];

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
    const search = searchInputObj.value.trim().toLowerCase();
      if (!contentPageData.value) return [];
      if (!search) return contentPageData.value;
      return contentPageData.value.filter(item =>
      item.fio.toLowerCase().includes(search) || item.telegram_id.toLowerCase().includes(search)
    );
  });

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  };

  const getPageData = async () => {
    try {
      contentPageData.value = pageStab;
    } catch (error) {
      console.error("ошибка загрузки данных страницы")
    };
  };
  getPageData();

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