<script lang="ts" setup>
import { computed, ref } from 'vue';
import { vMaska } from "maska/vue"

interface IPhoneInputProps {
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
} = defineProps<IPhoneInputProps>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
  (e: 'update:validity', value: boolean): void;
}>();

const inputValue = computed({
  get: () => value,
  set: (newValue: string) => {
    emit('update:value', newValue)
  }
});
</script>

<template>
  <div class="input-container">
    <div class="input-container__label">
      <p>{{ label }}</p>
    </div>
    <div class="input-container__wrap">
      <input
        class="input"
        v-maska="'+7 ###-###-##-##'"
        :class="{ 'input--error': error.show }"
        :placeholder="placeholder"
        v-model="inputValue"
      >
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
@use "./style.scss";
</style>