<script lang="ts" setup>
import EntranceLayout from '@/components/layout/entrance/EntranceLayout.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import type { IInputPasswordProps } from '@/types/inputs/types';
import { reactive } from 'vue';

const emailInputObj = reactive<IInputPasswordProps>({
  value: '',
  label: 'Почта',
  placeholder: 'Почта',
  error: {
    show: false,
    text: ''
  },
});
</script>

<template>
  <EntranceLayout>
    <div class="authorization">
      <DefaultInput
        v-model:value="emailInputObj.value"
        :label="emailInputObj.label"
        :placeholder="emailInputObj.placeholder"
        :error="emailInputObj.error"
      />
    </div>
  </EntranceLayout>
</template>

<style>

</style>