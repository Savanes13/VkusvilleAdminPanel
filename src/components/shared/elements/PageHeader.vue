<script lang="ts" setup>
import HintItem from './HintItem.vue';

interface IPageHeaderProps {
  hintText?: string
  hintWidth?: number
  hintHeight?: number
}

const {
  hintText,
  hintWidth,
  hintHeight
} = defineProps<IPageHeaderProps>();
</script>

<template>
  <div class="page-header">
    <div>
      <slot></slot>
    </div>
    <div v-if="hintText && hintHeight && hintWidth">
      <hint-item
        :text="hintText"
        :width="hintWidth"
        :height="hintHeight"
        position="bottom-center"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  display: flex;
  gap: 8px;
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
  color: #333333;
  margin-bottom: 24px
}

@media (max-width: 768px) {
  .page-header {
    margin-left: 24px;
    font-size: 24px;
    line-height: 24px;
  }

  .page-header {
    margin-bottom: 20px;
  }
}
</style>