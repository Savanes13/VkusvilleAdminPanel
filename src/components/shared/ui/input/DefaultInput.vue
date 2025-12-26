<script lang="ts" setup>
import { computed } from 'vue';
import { inputIcons } from '../../icons/input/icons';

interface IDefaultInputProps {
  value: string;
  label: string;
  placeholder?: string;
  error: {
    show: boolean;
    text: string;
  }
  isSearch?: boolean;
};

let {
  value,
  label,
  placeholder,
  error = {
    show: false,
    text: ''
  },
  isSearch
} = defineProps<IDefaultInputProps>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
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
    <div 
      class="input-container__label"
      v-if="!isSearch"
    >
      <p>{{ label }}</p>
    </div>
    <div class="input-container__wrap">
      <div class="search-svg">
        <span
          v-html="inputIcons['search']"
        ></span>
      </div>
      <input
        class="input"
        :class="{ 
          'input--error': error.show,
          'input--search': isSearch
        }"
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

.search-svg {
  position: absolute;
  top: 8px;
  left: 8px;
}

.input--search {
  padding-left: 36px;
}
</style>