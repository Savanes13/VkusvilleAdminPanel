<script lang="ts" setup>
import Header from './components/Header.vue';
import LeftPanel from './components/LeftPanel.vue';
</script>

<template>
  <div class="default-layout">
    <Header/>
    <div class="default-layout__content">
      <LeftPanel/>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout__content {

}
</style>