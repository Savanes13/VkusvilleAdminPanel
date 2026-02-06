<script lang="ts" setup>
import { ref } from 'vue';
import { mainIcons } from '../icons/mainIcons';

interface IHintItemProps {
  text: string
  width: number
  height: number
  position?: 
    | 'top-left' | 'top-center' | 'top-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right'
    | 'left-top' | 'left-center' | 'left-bottom'
    | 'right-top' | 'right-center' | 'right-bottom'
}

const {
  text,
  width,
  height,
  position = 'bottom-right' // значение по умолчанию
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
      :class="{'hint-item__icon--active' : isHintVisible}"
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
        :class="`hint-item__content--${position}`"
        v-clickOutside="toggleHint"
      >
        <p>{{ text }}</p>
      </div>
    </transition>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.hint-item {
  position: relative;
}

.hint-item__icon {
  cursor: pointer;
}

.hint-item__icon:hover {
  :deep(svg path) {
    transition: fill transition.$fast;
    fill: color.$colorTextSecondary;
  } 
}

.hint-item__icon--active {
  :deep(svg path) {
    fill: color.$colorTextPrimary !important
  } 
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

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  // ↓ Вниз
  &--bottom-left {
    top: 100%;
    left: 0;
    margin-top: 8px;
  }
  &--bottom-center {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
  }
  &--bottom-right {
    top: 100%;
    right: 0;
    margin-top: 8px;
  }

  // ↑ Вверх
  &--top-left {
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
  }
  &--top-center {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
  }
  &--top-right {
    bottom: 100%;
    right: 0;
    margin-bottom: 8px;
  }

  // ← Влево
  &--left-top {
    right: 100%;
    top: 0;
    margin-right: 8px;
  }
  &--left-center {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 8px;
  }
  &--left-bottom {
    right: 100%;
    bottom: 0;
    margin-right: 8px;
  }

  // → Вправо
  &--right-top {
    left: 100%;
    top: 0;
    margin-left: 8px;
  }
  &--right-center {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
  }
  &--right-bottom {
    left: 100%;
    bottom: 0;
    margin-left: 8px;
  }

  &--bottom-left::before,
  &--bottom-center::before,
  &--bottom-right::before {
    top: -6px;
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent color.$colorTextPrimary transparent;
  }

  &--bottom-left::before {
    left: 7px;
  }

  &--bottom-center::before {
    left: 50%;
    transform: translateX(-50%);
  }

  &--bottom-right::before {
    right: 7px;
  }

  &--top-left::before,
  &--top-center::before,
  &--top-right::before {
    bottom: -6px;
    border-width: 6px 6px 0 6px;
    border-color: color.$colorTextPrimary transparent transparent transparent;
  }

  &--top-left::before {
    left: 12px;
  }

  &--top-center::before {
    left: 50%;
    transform: translateX(-50%);
  }

  &--top-right::before {
    right: 12px;
  }

  &--left-top::before,
  &--left-center::before,
  &--left-bottom::before {
    right: -6px;
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent color.$colorTextPrimary;
  }

  &--left-top::before {
    top: 12px;
  }

  &--left-center::before {
    top: 50%;
    transform: translateY(-50%);
  }

  &--left-bottom::before {
    bottom: 12px;
  }

  &--right-top::before,
  &--right-center::before,
  &--right-bottom::before {
    left: -6px;
    border-width: 6px 6px 6px 0;
    border-color: transparent color.$colorTextPrimary transparent transparent;
  }

  &--right-top::before {
    top: 12px;
  }

  &--right-center::before {
    top: 50%;
    transform: translateY(-50%);
  }

  &--right-bottom::before {
    bottom: 12px;
  }
}
</style>