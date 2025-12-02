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

.check-mark {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #2DBE64;
}

.check-mark--active {
  background: #2DBE64;
}

.check-mark img {
  user-select: none;
}
</style>