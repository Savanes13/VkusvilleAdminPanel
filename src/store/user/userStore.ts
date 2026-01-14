import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TAccessToken } from './types';

export const useUserStore = defineStore('UserStore', () => {
  // const accessToken = ref<TAccessToken>(null);
  const accessToken = ref<TAccessToken>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzY4MzgxMDE1LCJ0eXBlIjoiYWNjZXNzIiwicm9sZSI6IlNVUEVSX0FETUlOIn0.abJP25PEuLpnKYVbi-VIP4HHejHIp8I_0sduh_NqiEs');
  
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzY4MzgxMDE1LCJ0eXBlIjoiYWNjZXNzIiwicm9sZSI6IlNVUEVSX0FETUlOIn0.abJP25PEuLpnKYVbi-VIP4HHejHIp8I_0sduh_NqiEs

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  return { 
    accessToken,
    setAccessToken
  };
});


// {,…}
// access_token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzY4MzA0MTcwLCJ0eXBlIjoiYWNjZXNzIiwicm9sZSI6IlNVUEVSX0FETUlOIn0.kVTsJuQ1kT5PKfGdw0Prcwsz_ueDPsHZv7oSMywC9hE"
// refresh_token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzcwODk1MjcwLCJ0eXBlIjoicmVmcmVzaCJ9.gn6UWoLEihfubAamqbfDf-BxlRmBu1b4hoxtEqfvRFo"
// token_type
// : 
// "bearer"