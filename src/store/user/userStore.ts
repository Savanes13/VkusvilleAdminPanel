import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TAccessToken } from './types';

export const useUserStore = defineStore('UserStore', () => {
  const accessToken = ref<TAccessToken>(null);

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  const deleteAccessToken = () => {
    accessToken.value = null;
  };

  return { 
    accessToken,
    setAccessToken,
    deleteAccessToken
  };
});
