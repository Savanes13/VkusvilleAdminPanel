<script lang="ts" setup>
import { buttonIcons } from '@/components/shared/icons/button/icons';

interface IScoreButtonProps {
  number: number
}

const {
  number
} = defineProps<IScoreButtonProps>();
</script>

<template>
  <div class="score-button">
    <div>
      <p>{{ number }}</p>
    </div>
    <div>
      <span
        class="svg"
        v-html="buttonIcons['circleClose']"
      ></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.score-button {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 65px;
  height: 40px;
  border-radius: 12px;
  padding: 8px 12px;
  background: color.$colorAccentGreen;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextWhite;
  cursor: pointer;
  transition: background-color transition.$medium;
}

.score-button:hover {
  background-color: color.$colorBackgroundAccent_Hover;
}

.svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
