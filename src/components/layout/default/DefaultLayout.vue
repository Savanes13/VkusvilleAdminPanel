<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Header from './components/header/Header.vue';
import LeftPanel from './components/leftPanel/LeftPanel.vue';
import MobileItem from './components/mobileItem/MobileItem.vue';

const route = useRoute();
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
    <div class="default-layout__mobile-panel">
      <MobileItem
        :is-active="route.path === '/dashboard' || route.path === '/'"
        icon="star"
        text="Дашборд"
        path="/dashboard"
      />
      <MobileItem
        :is-active="route.path === '/stages'"
        icon="stages"
        text="Этапы"
        path="/stages"
      />
      <MobileItem
        :is-active="route.path === '/content'"
        icon="content"
        text="Контент"
        path="/content"
      />
      <!-- еще -->
    </div>
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
  height: 100vh;
}

.default-layout__mobile-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 50px;
  background: color.$colorTextWhite;
  border-top: 1px solid color.$colorSeparator;
  display: none;
}

.admin-page {
  flex: 1;
  overflow-x: auto;
  background: #F5F5F5;
}

@media (max-width: 768px) {
  .default-layout {
    padding: 0px;
  }

  .default-layout__mobile-panel {
    display: flex;
  }
}
</style>