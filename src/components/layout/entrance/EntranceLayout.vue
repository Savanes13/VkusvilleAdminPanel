<script lang="ts" setup>
import logo from '@/assets/images/logo/logoGroup.svg'
</script>

<template>
  <div class="entrance">
    <div class="entrance__block">
      <router-link to="/">
        <div class="logo">
          <img :src="logo" alt="logo"/>
        </div>
      </router-link>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.entrance {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.entrance__block {
  width: 416px;
  margin-top: 104px;
}

.logo {
  text-align: center;
}

.content {
  margin-top: 25px;
}
</style>