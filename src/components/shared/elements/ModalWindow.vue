<script lang="ts" setup>
import close from '@/assets/images/mainIcons/close.svg'

interface IModalWindowProps {
  name: string
};

const {
  name
} = defineProps<IModalWindowProps>();

const emit = defineEmits<{
  (e: 'close'): void
}>();

const closeWindow = () => {
  emit("close");
};
</script>

<template>
  <div class="modal-window">
    <div class="modal-window__header">
      <div>
        <p>{{ name }}</p>
      </div>
      <div
        @click="closeWindow"
        class="close"
      >
        <img :src="close" alt="">
      </div>
    </div>
    <slot></slot>
  </div>
</template>


<style lang="scss" scoped>
.modal-window {
  width: 100%;
  position: relative;
  border-radius: 24px;
  padding: 24px;
  background: #FFFFFF;
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
</style>