<script lang="ts" setup>
import close from '@/assets/images/mainIcons/close.svg'
import { mainIcons } from '../icons/mainIcons';
import { onMounted, onUnmounted, ref } from 'vue';

interface IModalWindowProps {
  name: string;
  haveMobileType?: boolean;
};

const {
  name,
  haveMobileType = false
} = defineProps<IModalWindowProps>();

const pageWidth = ref<number>(0);

onMounted(() => {
  pageWidth.value = window.innerWidth;
  window.onresize = () => {
    pageWidth.value = window.innerWidth;
  };
});

onUnmounted(() => {
  window.onresize = null;
});

const emit = defineEmits<{
  (e: 'close'): void
}>();

const closeWindow = () => {
  emit("close");
};
</script>

<template>
  <div class="modal-window">
    <div 
      class="modal-window__header"
      :class="{'modal-window__header--mobile-type' : haveMobileType}"
    >
      <div
        v-if="haveMobileType"
        class="arrow"
        @click="closeWindow"
      >
        <span
          v-html="mainIcons['chevronLeft']"
        ></span>
      </div>
      <div>
        <p>{{ name }}</p>
      </div>
      <div
        @click="closeWindow"
        class="close"
        v-if="!haveMobileType || pageWidth > 500"
      >
        <img :src="close" alt="">
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.modal-window {
  width: 100%;
  position: relative;
  border-radius: 24px;
  padding: 24px;
  background: #FFFFFF;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.modal-window::-webkit-scrollbar {
  width: 8px;
  height: 8px !important;
  cursor: default !important;
}

.modal-window::-webkit-scrollbar-track {
  background: color.$colorBackgroundSecondary;
  border-radius: 6px;
  overflow: hidden;
  cursor: default !important;
}

.modal-window::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: color.$colorTextTertiary;
  cursor: default !important;
}

.modal-window__header {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: #333333;
  margin-bottom: 24px;
}

.close {
  cursor: pointer;
}

.arrow {
  display: none;
}

@media (max-width: 500px) {
  .arrow {
    display: block;
    position: absolute;
    top: 31px;
    left: 16px;
  }

  .modal-window__header {
    font-size: 20px;
    line-height: 20px;
  }

  .modal-window__header--mobile-type {
    margin-top: 9px;
    justify-content: center;
  }
}
</style>