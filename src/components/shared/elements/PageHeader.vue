<script lang="ts" setup>

</script>

<template>
  <div class="page-header">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
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