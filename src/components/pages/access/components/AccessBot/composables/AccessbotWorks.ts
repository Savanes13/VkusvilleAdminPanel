import { createAccessAdmin, deleteContentAccessAdmin, getContentAccessAdmins } from "@/api/pages/access/apiAccess";
import type { IInputDefaultProps } from "@/types/inputs/types";
import type { TAdminRole, TDataAdmins } from "@/types/pages/access/accessTypes";
import { reactive, ref, watch } from "vue";

export default function AccessbotWorks () {
  const pageDataArr = ref<null | TDataAdmins>(null);
  const selectedItemBot = ref<number>(1);

  const phoneInputObj = reactive<IInputDefaultProps>({
    value: '',
    label: 'Номер телефона',
    placeholder: '+ 7',
    error: {
      show: false,
      text: 'phoneNumber'
    },
  });
  
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
      value: "Эксперт 1 уровня"
    },
    {
      id: 2,
      value: "Эксперт 2 уровня"
    },
    {
      id: 3,
      value: "Менеджер продвижения"
    }
  ];
  
  watch(() => phoneInputObj.value, () => {
    phoneInputObj.error.show = false;
  });
  
  watch(() => fioInputObj.value, () => {
    fioInputObj.error.show = false;
  });

  const setNewSelectValue = (id: number) => {
    selectedItemBot.value = id;
  };

  const numberNormalize = () => {
    return phoneInputObj.value.replace(/\D/g, '');
  };

  const checkingPhoneValidity = () => {
    if (!phoneInputObj.value) {
      phoneInputObj.error.show = true;
      phoneInputObj.error.text = 'Поле не заполнено';
      return false; 
    }
    if (phoneInputObj.value.length < 16) {
      phoneInputObj.error.show = true;
      phoneInputObj.error.text = 'Введите номер полностью';
      return false; 
    }
    return true;
  };

  const checkingFioValidity = () => {
  if (!fioInputObj.value) {
      fioInputObj.error.show = true;
      fioInputObj.error.text = 'Поле не заполнено';
      return false; 
    };
    return true;
  };

  const checkingFormValidity = () => {
    const isPhoneValid = checkingPhoneValidity();
    const isFioValid = checkingFioValidity();
    return isPhoneValid && isFioValid;
  };

  const selectRole = (): TAdminRole => {
    if (selectedItemBot.value === 1) return "expert1";
    if (selectedItemBot.value === 2) return "expert2";
    if (selectedItemBot.value === 3) return "manager";
    return "expert1";
  };

  const createNewAdmin = async () => {
    try {
      if(!checkingFormValidity()) return;
      if(!pageDataArr.value) return
      await createAccessAdmin(fioInputObj.value, numberNormalize(), selectRole());
      pageDataArr.value.push({
        name: fioInputObj.value,
        phone: numberNormalize(),
        role: selectRole()
      });
      phoneInputObj.value = '';
      fioInputObj.value = '';
    } catch (error) {
      console.error("ошибка создания админа");
    };
  };

  const deleteAdmin = async (phone: string) => {
    try { 
      await deleteContentAccessAdmin(phone);
      if (!pageDataArr.value) return
      pageDataArr.value = pageDataArr.value.filter(
        item => item.phone !== phone
      );
    } catch (error) {
      console.error("ошибка при удалении админа")
    };
  };

  const getPageData = async () => {
    try {
      const response = await getContentAccessAdmins();
      pageDataArr.value = response.admins;
    } catch (error) {
      console.error("ошибка при получении данных")
    };
  };
  getPageData();

  return {
    pageDataArr,
    selectedItemBot,
    phoneInputObj,
    fioInputObj,
    selectArr,
    setNewSelectValue,
    createNewAdmin,
    deleteAdmin
  }
}