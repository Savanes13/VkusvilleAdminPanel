<script setup lang="ts">
  
</script>

<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@use "./style/main";
@use "./style/variables/font" as font;

.app {
  font-family: font.$font-EuclidCircularB;
}

body {
  font-family: font.$font-EuclidCircularB;
}
</style>
