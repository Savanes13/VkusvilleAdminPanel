<script lang="ts" setup>

</script>

<template>
  <div class="time-block">
    
    <div class="time-block__item">
      <p>09:00</p>
    </div>
    <div class="time-block__item">
      <p>10:00</p>
    </div>
    <div class="time-block__item">
      <p>11:00</p>
    </div>
    <div class="time-block__item">
      <p>12:00</p>
    </div>
    <div class="time-block__item">
      <p>13:00</p>
    </div>
     <div class="time-block__item">
      <p>14:00</p>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.time-block {
  display: flex;
  flex-direction: column;
  width: 67px;
}

.time-block__item {
  display: flex;
  align-items: end;
  justify-content: end;
  height: 62px;
  padding-right: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: color.$colorIconSecondary;
}
</style>