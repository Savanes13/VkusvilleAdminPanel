<script lang="ts" setup>
import { mainIcons } from '@/components/shared/icons/mainIcons';
</script>

<template>
  <div class="final-assessment">
    <div class="final-assessment__title">
      <div>
        <p>Итоговая оценка</p>
      </div>
      <div>
        <!-- hint -->
      </div>
    </div>

    <div class="final-assessment__content">
      <div class="score">
        <p>9,5</p>
      </div>
      <div class="failed">
        <div>
          <span
            class="svg"
            v-html="mainIcons['closeRed']"
          ></span>
        </div>
        <div>
          <p>Не прошел</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.final-assessment {
  display: inline-block;
  background: color.$colorBackgroundWhite;
  padding: 20px;
  border: 1px solid #DDE0E8;
  border-radius: 16px;
}

.final-assessment__title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 16px;
}

.final-assessment__content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score {
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  color: color.$colorTextPrimary;
}

.failed {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0px 6px;
  background: color.$colorBackgroundNegativeTint;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: color.$colorTextNegative;
  border-radius: 12px;
}

.svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>