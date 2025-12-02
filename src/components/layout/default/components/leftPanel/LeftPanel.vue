<script lang="ts" setup>
import star from '@/assets/images/leftpanel/star.svg'
import PanelItem from './components/PanelItem.vue';
</script>

<template>
  <div class="left-panel">
    <PanelItem
      :is-active="true"
      :icon="star"
      text="Главные KPI"
      path="/"
    />
    <PanelItem
      :is-active="false"
      :icon="star"
      text="Главные KPI"
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