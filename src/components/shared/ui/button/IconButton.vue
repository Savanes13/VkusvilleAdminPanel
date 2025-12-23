<script lang="ts" setup>
import { buttonIcons } from '../../icons/button/icons';

interface IIconButtonProps {
  icon: string
}

const {
  icon
} = defineProps<IIconButtonProps>();
</script>

<template>
  <div class="button-icon">
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

.button-icon__color-green-transparent {
  background: color.$colorBackgroundAccentAlternative;
}

.button-icon__color-green-transparent:hover {
  background: color.$colorBackgroundAccentAlternative_Hover;
}
</style>