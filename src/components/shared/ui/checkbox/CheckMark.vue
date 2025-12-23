<script lang="ts" setup>
import { computed } from 'vue';
import arrow from '@/assets/images/checkbox/arrow.svg'

interface ICheckMarkProps {
  state: boolean
  error?: boolean
};

const {
  state,
  error = false
} = defineProps<ICheckMarkProps>();

const emit = defineEmits({
  'update:state': (state: boolean) => true
});

const isChecked = computed({
  get: () => state,
  set: (newValue: boolean) => {
    emit('update:state', newValue);
  }
});

const toggleCheck = () => {
  isChecked.value = !isChecked.value;
};
</script>

<template>
  <div 
    class="check-mark"
    :class="{'check-mark--active' : isChecked}"
    @click="toggleCheck"
  >
    <img v-if="isChecked" :src="arrow" alt="">
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.check-mark {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid color.$colorIconTertiary;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color transition.$fast;
  cursor: pointer;
}

.check-mark--active {
  background: color.$colorStrokeAccent;
  border: 1px solid color.$colorStrokeAccent;
}

.check-mark img {
  user-select: none;
}
</style>