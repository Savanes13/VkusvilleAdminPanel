<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'changeText', value: string): void;
}>();

const closeWindow = () => {
  emit("close");
};
</script>

<template>
  <BackgroundModal :grey-mobile="true">
    <div 
      class="delete-window"
      v-clickOutside="closeWindow"
    >
      <ModalWindow
        name="Удаление эксперта"
        @close="closeWindow"
        :have-mobile-type="true"
      > 
        
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
</style>