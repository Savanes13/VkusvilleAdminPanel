import { createAccessToken, deleteAccessToken, getAccessAdminsAdminPanel, getAccessTokens } from "@/api/pages/access/apiAccess";
import type { IInputDefaultProps } from "@/types/inputs/types";
import type { TDataTokenAccess } from "@/types/pages/access/accessTypes";
import { reactive, ref } from "vue";

export default function AccessadminWorks () {
  const selectedItemAdmin = ref<number>(1);
  const tokenTableArr = ref<null | TDataTokenAccess>(null);
  
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

  const createToken = async () => {
    const selectedRole = selectedItemAdmin.value === 1 ? "Admin" : "Guest";
    try {
      const response  = await createAccessToken(selectedRole);
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
      if(!tokenTableArr.value) return;
    } catch (error) {
      console.error("ошибка при создании токена");
    }
  };

  const getPageData = async () => {
    try {
      // const [tokensResponse, adminsResponse] = await Promise.all([
      const [tokensResponse] = await Promise.all([
        getAccessTokens(),
        // getAccessAdminsAdminPanel()
      ]);
      tokenTableArr.value = tokensResponse.items;
    } catch (error) {
      console.error("ошибка при получении данных");
    }
  };
  getPageData();

  return {
    selectedItemAdmin,
    selectArr,
    tokenTableArr,

    setNewSelectValue,
    createToken,
    deleteToken
  }
}