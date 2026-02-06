<script lang="ts" setup>
import { leftPanelIcons } from '@/components/shared/icons/leftPanel/icons';

interface IMobileItemProps {
  isActive: boolean;
  icon: string;
  text: string;
  path: string;
  hidePanel?: boolean
};

const {
  isActive,
  icon,
  text,
  path,
  hidePanel = false
} = defineProps<IMobileItemProps>();
</script>

<template>
  <router-link
    :to="path" 
    class="mobile-item"
    :class="{
      'mobile-item--active' : isActive,
      'mobile-item--hide-panel' : hidePanel
    }"
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
  color: color.$colorTextSecondary;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}

.mobile-item--active {
  color: color.$colorTextPrimary !important;
  padding: 12px 0px;
  .svg {
    :deep(svg path) {
      fill: color.$colorTextPrimary;
    }
  }
}

.mobile-item--hide-panel {
  flex-direction: row;
  gap: 10px;
  font-size: 16px;
  line-height: 20px;
}

.svg {
  :deep(svg path) {
    fill: color.$colorTextSecondary;
    width: 20px;
    height: 20px;
  }
}
</style>