<script lang="ts" setup>
import { computed } from 'vue';

interface ITextAreaProps {
  value: string;
  label?: string;
  placeholder?: string;
  height: number
}

const {
  value,
  label,
  placeholder,
  height
} = defineProps<ITextAreaProps>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();


const areaValue = computed({
  get: () => value,
  set: (newValue: string) => {
    emit('update:value', newValue)
  }
});
</script>

<template>
  <div class="text-area">
    <div class="text-area__label">
      <p>{{ label }}</p>
    </div>
    <textarea 
      type="text"
      class="text-area__textarea"
      :style="{ height: height }"
      v-model="areaValue"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.text-area {
  width: 100%;
  height: 100%;
}

.text-area__label {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
  margin-bottom: 8px;
}

.text-area__textarea {
  resize: none;
  width: 100%;
  height: 100%;
  border: 1px solid #DDE0E8;
  border-radius: 8px;
  padding: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  height: 136px;
}

.text-area__textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px !important;
  cursor: default !important;
}

.text-area__textarea::-webkit-scrollbar-track {
  background: color.$colorBackgroundSecondary;
  border-radius: 6px;
  overflow: hidden;
  cursor: default !important;
}

.text-area__textarea::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: color.$colorTextTertiary;
  cursor: default !important;
}
</style>