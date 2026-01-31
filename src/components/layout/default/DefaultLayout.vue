<script lang="ts" setup>
import Header from './components/header/Header.vue';
import LeftPanel from './components/leftPanel/LeftPanel.vue';
import MobileBlock from './components/mobile/MobileBlock.vue';
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
    <MobileBlock/>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.default-layout {
  background-color: color.$colorBackgroundSecondary;
  padding: 0px 40px;
}

.default-layout__content {
  width: 100%;
  display: flex;
}

.admin-page {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  background: #F5F5F5;
}

@media (max-width: 768px) {
  .default-layout {
    padding: 0px;
  }
}
</style>