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
  smallMobile?: boolean;
  numberType?: boolean;
};

let {
  value,
  label,
  placeholder,
  error = {
    show: false,
    text: ''
  },
  isSearch = false,
  smallMobile = false,
  numberType = false
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
      <div 
        class="search-svg"
        v-if="isSearch"
      >
        <span
          v-html="inputIcons['search']"
        ></span>
      </div>
      <input
        class="input"
        :type="numberType ? 'number' : 'text'"
        :class="{ 
          'input--error': error.show,
          'input--search': isSearch,
          'input--small': smallMobile
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

/* Chrome, Edge, Safari */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

@media (max-width: 425px) {
  .input--small {
    height: 36px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>