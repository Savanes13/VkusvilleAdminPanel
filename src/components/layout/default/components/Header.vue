<script lang="ts" setup>
import logo from '@/assets/images/logo/logo.svg'
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
</style>