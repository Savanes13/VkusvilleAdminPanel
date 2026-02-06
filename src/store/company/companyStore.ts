import { defineStore } from 'pinia';
import type { TCompanyType } from './types';
import { computed, ref } from 'vue';

export const useCompanyStore = defineStore('CompanyStore', () => {
  const selectedCompany = ref<TCompanyType>('Reo'); 

  const apiBaseUrl = computed(() => `/api/${selectedCompany.value}`);

  return { 
    selectedCompany,
    apiBaseUrl
  };
});
