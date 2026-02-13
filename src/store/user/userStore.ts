import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TUserRole, TAccessToken } from './types';

export const useUserStore = defineStore('UserStore', () => {
  const accessToken = ref<TAccessToken>(null);
  const role = ref<TUserRole>('GUEST');

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  const deleteAccessToken = () => {
    accessToken.value = null;
  };

  return { 
    accessToken,
    role,
    setAccessToken,
    deleteAccessToken
  };
});
