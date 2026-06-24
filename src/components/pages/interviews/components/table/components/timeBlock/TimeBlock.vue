<script lang="ts" setup>
const slots = Array.from({ length: 30 }, (_, i) => {
  const totalMinutes = (i + 1) * 30 + 8 * 60;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});
</script>

<template>
  <div class="time-block">
    <div class="time-block__item">
      <p></p>
    </div>
    <div
      v-for="time in slots"
      :key="time"
      class="time-block__item"
    >
      <p>{{ time }}</p>
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
