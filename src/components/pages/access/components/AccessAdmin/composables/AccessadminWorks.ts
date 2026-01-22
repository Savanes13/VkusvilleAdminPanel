import { createAccessToken, deleteAccessAdminsAdminPanel, deleteAccessToken, getAccessAdminsAdminPanel, getAccessTokens } from "@/api/pages/access/apiAccess";
import type { IInputDefaultProps } from "@/types/inputs/types";
import type { TDataAdminAdminsAccess, TDataTokenAccess } from "@/types/pages/access/accessTypes";
import { reactive, ref } from "vue";

export default function AccessadminWorks () {
  const selectedItemAdmin = ref<number>(1);
  const tokenTableArr = ref<null | TDataTokenAccess>(null);
  const adminTableArr = ref<null | TDataAdminAdminsAccess>(null);
  const showTokenWindow = ref<boolean>(false);
  const createdToken = ref<string>('');
  
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

  const closeWindow = () => {
    showTokenWindow.value = false;
  };

  const createToken = async () => {
    const selectedRole = selectedItemAdmin.value === 1 ? "Admin" : "Guest";
    try {
      const response  = await createAccessToken(selectedRole);
      createdToken.value = '';
      showTokenWindow.value = true;
      createdToken.value = response.token;
      if(!tokenTableArr.value) return;
      tokenTableArr.value.push(response);
    } catch (error) {
      console.error("ошибка при созданрии токена");
    }
  };

  const deleteToken = async (uuid: string) => {
    try {
      await deleteAccessToken(uuid);
      if (!tokenTableArr.value) return;
      tokenTableArr.value = tokenTableArr.value.filter(
        item => item.token !== uuid
      );
    } catch (error) {
      console.error("ошибка при создании токена");
    }
  };

  const deleteAdmin = async (id: number) => {
    try {
      await deleteAccessAdminsAdminPanel(id);
      if (!adminTableArr.value) return;
      adminTableArr.value = adminTableArr.value.filter(
        item => item.id !== id
      );
    } catch (error) {
      console.error("ошибка при создании токена");
    }
  };

  const getPageData = async () => {
    try {
      const [tokensResponse, adminsResponse] = await Promise.all([
        getAccessTokens(),
        getAccessAdminsAdminPanel()
      ]);
      tokenTableArr.value = tokensResponse.items;
      adminTableArr.value = adminsResponse.admins;
    } catch (error) {
      console.error("ошибка при получении данных");
    }
  };
  getPageData();

  return {
    selectedItemAdmin,
    selectArr,
    tokenTableArr,
    adminTableArr,
    showTokenWindow,
    createdToken,
    setNewSelectValue,
    createToken,
    deleteToken,
    deleteAdmin,
    closeWindow
  }
}