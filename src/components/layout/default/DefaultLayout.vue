<script lang="ts" setup>
import Header from './components/header/Header.vue';
import LeftPanel from './components/leftPanel/LeftPanel.vue';
</script>

<template>
  <div class="default-layout">
    <Header />
    <div class="default-layout__content">
      <LeftPanel />
      <div class="admin-page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout__content {
  display: flex;
}

.admin-page {
  width: 100%;
  padding: 40px;
  background: #F5F5F5;
}
</style>