<script lang="ts" setup>
import { buttonIcons } from '@/components/shared/icons/button/icons';

interface IScoreButtonProps {
  number: number;
  activity: boolean;
}

const {
  number,
  activity
} = defineProps<IScoreButtonProps>();
</script>

<template>
  <div 
    class="score-button"
    :class="{'score-button--activ' : activity }"
    @click.stop
  >
    <div>
      <p>{{ number }}</p>
    </div>
    <div v-if="activity">
      <span
        class="svg"
        v-html="buttonIcons['circleClose']"
      ></span>
    </div>
    <div v-else>
      <span
        class="svg plus-svg"
        v-html="buttonIcons['plus']"
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
  justify-content: space-between;
  gap: 6px;
  width: 65px;
  height: 40px;
  border-radius: 12px;
  padding: 8px 12px;
  background: color.$colorBackgroundAccentAlternative;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextWhite;
  cursor: pointer;
  transition: background-color transition.$medium;
}

.score-button:hover {
  background: color.$colorBackgroundAccentAlternative_Hover;
}

.score-button--activ {
  background: color.$colorAccentGreen;
}

.score-button--activ:hover {
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
