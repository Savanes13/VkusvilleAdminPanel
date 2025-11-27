<script lang="ts" setup>
import EntranceLayout from '@/components/layout/entrance/EntranceLayout.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import PasswordInput from '@/components/shared/ui/input/PasswordInput.vue';
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

const passwordInputObj = reactive<IInputPasswordProps>({
  value: '',
  label: 'Пароль',
  placeholder: 'Пароль',
  error: {
    show: false,
    text: ''
  },
});
</script>

<template>
  <EntranceLayout>

    <div class="authorization">

      <div class="authorization__info">
        <div class="title">
          <p>Регистрация</p>
        </div>
        <div class="text">
          <p>Какой-то поясняющий текст про авторизацию. Может даже в две строки</p>
        </div>
      </div>

      <div class="authorization__inputs">
        <DefaultInput
          class="input-item"
          v-model:value="emailInputObj.value"
          :label="emailInputObj.label"
          :placeholder="emailInputObj.placeholder"
          :error="emailInputObj.error"
        />
        <PasswordInput
          class="input-item"
           v-model:value="passwordInputObj.value"
          :label="passwordInputObj.label"
          :placeholder="passwordInputObj.placeholder"
          :error="passwordInputObj.error"
        />
      </div>


    </div>

  </EntranceLayout>
</template>

<style lang="scss" scoped>
.title {
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  margin-bottom: 16px;
}

.text {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  margin-bottom: 24px;
}

.input-item {
  margin-bottom: 23px;
}
</style>