<script lang="ts" setup>
import { buttonIcons } from '../../icons/button/icons';

interface IIconButtonProps {
  icon: string
  colorIcon?: string;
  disabled?: boolean;
}

const {
  icon,
  colorIcon = '#333333',
  disabled = false
} = defineProps<IIconButtonProps>();
</script>

<template>
  <div 
    class="button-icon" 
    :class="{'button-icon--disabled' : disabled}"
    :style="{ color: colorIcon }"
  >
    <span
      v-html="buttonIcons[icon]"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color transition.$medium;
}

.button-icon--disabled {
  opacity: 0.64;
  pointer-events: none;
}

.button-icon__color-green-transparent {
  background: color.$colorBackgroundAccentAlternative;
}

.button-icon__color-green-transparent:hover {
  background: color.$colorBackgroundAccentAlternative_Hover;
}

.button-icon__color-gray {
  background: color.$colorBackgroundSecondary;
  color: color.$colorTextPrimary;
}

.button-icon__color-gray:hover {
  background: color.$colorBackgroundSecondary_Hover;
}

.button-icon span {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* изменили только это: используем currentColor вместо захардкоженного red */
.button-icon:deep(svg path) {
  fill: currentColor;
}
</style>
