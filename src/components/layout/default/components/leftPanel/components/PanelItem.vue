<script lang="ts" setup>
import { leftPanelIcons } from '@/components/shared/icons/leftPanel/icons';

interface IPanelItemProps {
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
} = defineProps<IPanelItemProps>();
</script>

<template>
  <router-link 
    :to="path" 
    class="panel-item"
    :class="{'panel-item--active' : isActive}"
  >
    <div>
      <span
        v-html="leftPanelIcons[icon]"
      ></span>
    </div>
    <div class="panel-item__text">
      <p>{{ text }}</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.panel-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 12px;
  color: #333333;
}

.panel-item--active {
  color: #179C49;
  background: #DCFAE7;
  :deep(svg path) {
    fill: #179C49;
  }
}

.panel-item__text {
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
}
</style>