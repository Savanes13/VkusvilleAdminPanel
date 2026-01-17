<script lang="ts" setup>
import { buttonIcons } from '../../icons/button/icons';

interface IDefaultButtonProps {
  leftIcon?: string;
  rightIcon?: string;
};

const {
  leftIcon,
  rightIcon
} = defineProps<IDefaultButtonProps>();
</script>

<template>
  <div class="default-button">
    <div 
      v-if="leftIcon"
      class="default-button__left-icon"
    >
      <span
        v-html="buttonIcons[leftIcon]"
      ></span>
    </div>
    <slot></slot>
    <div 
      v-if="rightIcon"
      class="default-button__right-icon"
    >
      <span
        v-html="buttonIcons[rightIcon]"
      ></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.default-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s ease;
  -webkit-user-select: none;
  -moz-user-select: none;   
  -ms-user-select: none;   
  user-select: none;
  cursor: pointer;
}

.default-button__left-icon {
  line-height: 0;      
  margin-right: 6px;
}

.default-button__right-icon {
  line-height: 0;      
  margin-left: 6px;
}

.default-button__size--large {
  height: 44px;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  border-radius: 16px;
}

.default-button__size--small {
  height: 40px;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  border-radius: 12px;
}

.default-button__color-green {
  background: #2DBE64;
  color: #ffffff;
}

.default-button__color-green:hover {
  background: #22A353;
}

.default-button__color-transparent {
  background: transparent;
  color: #179C49;
}

.default-button__color-transparent:hover {
  background: #F5F5F5;
}

.default-button__color-gray {
  background: #F5F5F5;
  color: #333333;
}

.default-button__color-gray:hover {
  background: #EBEBEB;
}

.default-button__color-green-transparent {
  background: #DCFAE7;
  color: #179C49;
}

.default-button__color-green-transparent:hover {
  background: #C0EDD0;
}

.default-button--disabled {
  opacity: 64%;
  pointer-events: none;
}

@media (max-width: 500px) {
  .default-button__size--large {
    height: 42px;
    font-size: 14px;
    line-height: 16px;
  }

  .default-button__size--small {
    height: 38px;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
