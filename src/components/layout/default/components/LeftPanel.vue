<script lang="ts" setup>
import star from '@/assets/images/leftpanel/star.svg'
</script>

<template>
  <div class="left-panel">

    <router-link 
      to="/" 
      class="left-panel__item"
      :class="{'left-panel__item--active' : true}"
    >
      <div>
        <img :src="star" alt="starimage">
      </div>
      <div>
        <p>Главные KPI</p>
      </div>
    </router-link>

    <router-link 
      to="/" 
      class="left-panel__item"
    >
      <div>
        <img :src="star" alt="starimage">
      </div>
      <div>
        <p>Этапы</p>
      </div>
    </router-link>

  </div>
</template>

<style lang="scss" scoped>
.left-panel {
  width: 344px;
  min-height: 100vh;
  padding: 24px 20px;
  border-right: 1px solid #D0D7E5
}

.left-panel__item {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 16px;
}

.left-panel__item--active {
  background: #DCFAE7;
  color: #179C49;
  border-radius: 12px;
}
</style>