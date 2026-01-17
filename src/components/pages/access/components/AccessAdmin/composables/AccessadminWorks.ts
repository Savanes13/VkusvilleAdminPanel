import { getAccessAdminsAdminPanel, getAccessTokens } from "@/api/pages/access/apiAccess";
import type { IInputDefaultProps } from "@/types/inputs/types";
import { reactive, ref } from "vue";

export default function AccessadminWorks () {
  const selectedItemAdmin = ref<number>(1);

  const fioInputObj = reactive<IInputDefaultProps>({
    value: '',
    label: 'ФИО*',
    placeholder: 'Введите ФИО',
    error: {
      show: false,
      text: ''
    },
  });
  
  const selectArr = [
    {
      id: 1,
      value: "Админ"
    },
    {
      id: 2,
      value: "Менеджер"
    }
  ];

  const setNewSelectValue = (id: number) => {
    selectedItemAdmin.value = id;
  };

  const getPageData = async () => {
    try {
      // const response = await getAccessAdminsAdminPanel();
      await getAccessTokens();
      // pageDataArr.value = response.admins;
    } catch (error) {
      console.error("ошибка при получении данных")
    };
  };
  getPageData();


  const stabAdminsArr = [
    { id: 1, email: 'MamutRahal', display_name: 'Mamut Rahal', role: 'Guest' },
    { id: 2, email: 'IvanPetrov', display_name: 'Иван Петров', role: 'User' },
    { id: 3, email: 'AnnaSmirnova', display_name: 'Анна Смирнова', role: 'Admin' },
    { id: 4, email: 'JohnDoe', display_name: 'John Doe', role: 'Guest' }
  ]


  return {
    selectedItemAdmin,
    fioInputObj,
    selectArr,

    stabAdminsArr,

    setNewSelectValue
  }
}