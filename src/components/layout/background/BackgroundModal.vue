<script lang="ts" setup>

</script>

<template>
  <Teleport to="body">
    <div
      class="background-modal"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.background-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: #00000080;
}
</style>