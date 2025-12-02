<script lang="ts" setup>
import PanelItem from './components/PanelItem.vue';
</script>

<template>
  <div class="left-panel">
    <PanelItem
      :is-active="true"
      icon="star"
      text="Главные KPI"
      path="/"
    />
    <PanelItem
      :is-active="false"
      icon="stages"
      text="Этапы"
      path="/"
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
  padding: 24px 20px;
  border-right: 1px solid #D0D7E5
}
</style>