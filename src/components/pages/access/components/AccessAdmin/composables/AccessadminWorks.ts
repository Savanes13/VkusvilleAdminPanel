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

  return {
    selectedItemAdmin,
    fioInputObj,
    selectArr,
    setNewSelectValue
  }
}