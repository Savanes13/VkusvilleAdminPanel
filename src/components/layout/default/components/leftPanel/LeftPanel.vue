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
      text="Дашборд"
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
      :is-active="route.path.includes('applicant')"
      icon="enrolle"
      text="Абитуриенты"
      path="/applicants"
    />
    <PanelItem
      :is-active="route.path === '/experts'"
      icon="expert"
      text="Эксперты"
      path="/experts"
    />
    <PanelItem
      :is-active="route.path === '/access'"
      icon="lock"
      text="Доступы"
      path="/access"
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

@media (max-width: 768px) {
  .left-panel {
    display: none;
  }
}
</style>