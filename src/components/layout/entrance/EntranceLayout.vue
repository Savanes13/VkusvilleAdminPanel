<script lang="ts" setup>

</script>

<template>
  <div class="entrance">
    <div class="entrance__block">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.entrance {
  background: color.$colorBackgroundSecondary;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.entrance__block {
  width: 438px;
  margin-top: 104px;
}

@media (max-width: 768px) {
  .entrance__block {
    margin-top: 54px;
  }
}

@media (max-width: 500px) {
  .entrance__block  {
    width: 100%;
    margin-top: 20px;
  }
}
</style>