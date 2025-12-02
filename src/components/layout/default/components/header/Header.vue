<script lang="ts" setup>
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { useCompanyStore } from '@/store/company/companyStore';
import logo from '@/assets/images/logo/logo.svg'
import { storeToRefs } from 'pinia';

const companyStore = useCompanyStore();
const { selectedCompany } = storeToRefs(companyStore);

const dataSwitch = [
  {
    name: "Reo",
    text: "РЭУ"
  },
  {
    name: "Rosbioteh",
    text: "Росбиотех"
  }
];
</script>

<template>
  <div class="header">
    <div class="header__left">
      <router-link to="/">
        <div class="logo">
          <img :src="logo" alt="logo"/>
        </div>
      </router-link>
      <div class="select-collaboration">
        <DefaultSwitch
          v-model:value="selectedCompany"
          :data="dataSwitch"
        />
      </div>
    </div>
    <div class="header__right">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>

.header {
  padding: 16px 24px;

  background: white;
  
  border-bottom: 1px solid #D0D7E5
}

.header__left {
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>