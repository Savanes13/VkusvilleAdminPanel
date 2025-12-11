<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
  
</script>

<template>
  <BackgroundModal>
    <div 
      class="stage-window"
    > 
      <ModalWindow
        name="Настройка"
      >
        
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
.stage-window {
  width: 560px;
}
</style>