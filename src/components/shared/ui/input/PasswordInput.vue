<script lang="ts" setup>
import { computed, ref } from 'vue';
import openEye from '@/assets/images/input/eye.svg'
import closeEye from '@/assets/images/input/closeEye.svg'

interface IPasswordInputProps {
  value: string;
  label: string;
  placeholder: string;
  error: {
    show: boolean,
    text: string
  },
};

let {
  value,
  label,
  placeholder,
  error = {
    show: false,
    text: ''
  },
} = defineProps<IPasswordInputProps>();

const showPassword = ref<boolean>(false);

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const inputValue = computed({
  get: () => value,
  set: (newValue: string) => {
    emit('update:value', newValue)
  }
});

const changeVisibilityPassword = () => {
  showPassword.value ? showPassword.value = false : showPassword.value = true;
};
</script>

<template>
  <div class="input-container">
    <div class="input-container__label">
      <p>{{ label }}</p>
    </div>
    <div class="input-container__wrap">
      <input
        class="input"
        :class="{ 'input--error': error.show }"
        :placeholder="placeholder"
        :type="showPassword ? 'text' : 'password'"
        v-model="inputValue"
      >
      <transition name="fadeFast" mode="out-in">
        <img
          class="eye-svg"
          :src="openEye"
          v-if="showPassword"
          @click="changeVisibilityPassword"
          key="show-password"
        />
        <img
          class="eye-svg"
          :src="closeEye"
          v-else
          @click="changeVisibilityPassword"
          key="hide-password"
        />
      </transition>
      <transition :name="'fade-slide'" mode="out-in">
        <div 
          class="error" 
          v-if="error.show"
          key="error"
        >
          <p>{{ error.text }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;
@use "./style.scss";

.eye-svg {
  position: absolute;
  top: 8px;
  right: 12px;
  cursor: pointer;

  width: 24px;
  height: 24px;

  // :deep(svg path) {
  //   transition: fill transition.$medium;
  // }

  // &:hover {
  //   :deep(svg path) {
  //     fill: color.$steel_gray_1;
  //   }
  // }
}
</style>