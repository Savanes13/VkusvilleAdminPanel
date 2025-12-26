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
      :is-active="route.path === '/content'"
      icon="content"
      text="Контент"
      path="/content"
    />
    <PanelItem
      :is-active="false"
      icon="enrolle"
      text="Абитуриенты"
      path="/"
    />
    <PanelItem
      :is-active="route.path === '/experts'"
      icon="expert"
      text="Эксперты"
      path="/experts"
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
@use "@/style/variables/color.scss" as color;

.left-panel {
  width: 207px;
  min-height: 100vh;
  flex-shrink: 0;
  margin-right: 24px;
}
</style>