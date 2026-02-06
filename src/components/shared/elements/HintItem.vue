<script lang="ts" setup>
import { ref } from 'vue';
import { mainIcons } from '../icons/mainIcons';

interface IHintItemProps {
  text: string
  width: number
  height: number
}

const {
  text,
  width,
  height
} = defineProps<IHintItemProps>();

const isHintVisible = ref<boolean>(false);

const toggleHint = () => {
  isHintVisible.value = !isHintVisible.value;
}
</script>

<template>
  <div class="hint-item">
    
    <div 
      class="hint-item__icon"
      @click="toggleHint "
    >
      <span
        v-html="mainIcons['hint']"
      ></span>
    </div>

    <transition name="fadeFast">
      <div 
        class="hint-item__content"
        v-if="isHintVisible"
        :style="{ width: width + 'px', height: height + 'px' }"
        v-clickOutside="toggleHint"
      >
        <p>{{ text }}</p>
      </div>
    </transition>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.hint-item {
  position: relative;
}

.hint-item__icon {
  cursor: pointer;
}

.hint-item__content {
  position: absolute;
  padding: 10px 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  border-radius: 8px;
  background: color.$colorTextPrimary;
  color: color.$colorTextWhite;
  z-index: 10;
}
</style>