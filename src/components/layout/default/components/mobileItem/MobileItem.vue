<script lang="ts" setup>
import { leftPanelIcons } from '@/components/shared/icons/leftPanel/icons';

interface IMobileItemProps {
  isActive: boolean;
  icon: string;
  text: string;
  path: string;
};

const {
  isActive,
  icon,
  text,
  path
} = defineProps<IMobileItemProps>();
</script>

<template>
  <router-link
    :to="path" 
    class="mobile-item"
    :class="{'mobile-item--active' : isActive}"
  >
    <div class="mobile-item__svg">
      <span
        class="svg"
        v-html="leftPanelIcons[icon]"
      ></span>
    </div>
    <div class="mobile-item__text">
      <p>{{ text }}</p>
    </div>
  </router-link >
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.mobile-item {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.mobile-item__text {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: color.$colorTextPrimary
}

.svg {
  :deep(svg) {
    width: 20px;
    height: 20px;
  }
}
</style>