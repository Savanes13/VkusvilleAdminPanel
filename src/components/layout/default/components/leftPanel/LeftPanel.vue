<script lang="ts" setup>
import { useRoute } from 'vue-router';
import PanelItem from './components/PanelItem.vue';

const route = useRoute();
</script>

<template>
  <div class="left-panel">
    <PanelItem
      :is-active="route.path === '/dashboard' || route.path === '/'"
      icon="star"
      text="Главные KPI"
      path="/dashboard"
    />
    <PanelItem
      :is-active="route.path === '/stages'"
      icon="stages"
      text="Этапы"
      path="/stages"
    />
    <PanelItem
      :is-active="false"
      icon="content"
      text="Контент"
      path="/"
    />
    <PanelItem
      :is-active="false"
      icon="enrolle"
      text="Абитуриенты"
      path="/"
    />
    <PanelItem
      :is-active="false"
      icon="expert"
      text="Эксперты"
      path="/"
    />
    <PanelItem
      :is-active="false"
      icon="lock"
      text="Доступы"
      path="/"
    />
    <PanelItem
      :is-active="false"
      icon="meeting"
      text="Собеседования"
      path="/"
    />
  </div>
</template>

<style lang="scss" scoped>
.left-panel {
  width: 344px;
  min-height: 100vh;
  flex-shrink: 0;
  padding: 24px 20px;
  border-right: 1px solid #D0D7E5
}
</style>