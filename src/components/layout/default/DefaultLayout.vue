<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Header from './components/header/Header.vue';
import LeftPanel from './components/leftPanel/LeftPanel.vue';
import MobileItem from './components/mobileItem/MobileItem.vue';
import { mainIcons } from '@/components/shared/icons/mainIcons';

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


    <!-- <div
      class="overlay">
    </div> -->

    <div class="hide-mobile">
      <div>
        fff
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
      <div class="still-button">
        <div>
          <span
            v-html="mainIcons['menu']"
          ></span>
        </div>
        <div>
          <p>Еще</p>
        </div>
      </div>
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
  // height: 100vh;
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

.default-layout__mobile-panel > * {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-page {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  background: #F5F5F5;
}

.still-button {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: color.$colorTextPrimary
}



.hide-mobile {
  position: fixed;
  // height: 100px;
  width: 100%;
  right: 0px;
  left: 0px;
  bottom: 50px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background: color.$colorTextWhite;
  padding: 24px;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
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