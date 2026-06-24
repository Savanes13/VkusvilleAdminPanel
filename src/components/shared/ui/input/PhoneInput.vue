<script lang="ts" setup>
import { computed, ref } from 'vue';
import { vMaska } from "maska/vue"

export interface IPhoneCountry {
  code: string;
  label: string;
  mask: string;
  placeholder: string;
}

interface IPhoneInputProps {
  value: string;
  label: string;
  placeholder: string;
  error: {
    show: boolean,
    text: string
  };
  countries?: IPhoneCountry[];
};

const DEFAULT_MASK = '+7 ###-###-##-##';

let {
  value,
  label,
  placeholder,
  error = {
    show: false,
    text: ''
  },
  countries,
} = defineProps<IPhoneInputProps>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
  (e: 'update:validity', value: boolean): void;
}>();

const selectedCountryCode = ref(countries?.[0]?.code ?? '+7');

const selectedCountry = computed(() =>
  countries?.find(c => c.code === selectedCountryCode.value)
);

const currentMask = computed(() =>
  selectedCountry.value?.mask ?? DEFAULT_MASK
);

const currentPlaceholder = computed(() =>
  selectedCountry.value?.placeholder ?? placeholder
);

const inputKey = ref(0);

const onCountryChange = (event: Event) => {
  const code = (event.target as HTMLSelectElement).value;
  selectedCountryCode.value = code;
  emit('update:value', '');
  inputKey.value++;
};

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
      <div class="phone-row">
        <select
          v-if="countries && countries.length > 1"
          class="country-select"
          :value="selectedCountryCode"
          @change="onCountryChange($event)"
        >
          <option v-for="c in countries" :key="c.code" :value="c.code">
            {{ c.label }}
          </option>
        </select>
        <input
          :key="inputKey"
          class="input"
          :class="{
            'input--error': error.show,
            'input--with-select': countries && countries.length > 1
          }"
          v-maska="currentMask"
          :placeholder="currentPlaceholder"
          v-model="inputValue"
        >
      </div>
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

.phone-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.country-select {
  height: 40px;
  border-radius: 8px;
  padding: 0 8px;
  background-color: #ffffff;
  border: 1px solid #DDE0E8;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  cursor: pointer;
  flex-shrink: 0;

  &:focus {
    border-color: #000000;
    outline: none;
  }
}

.input--with-select {
  flex: 1;
  min-width: 0;
}
</style>

<!-- старая реализация phoneInput -->

<!-- <script lang="ts" setup>
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
</style> -->