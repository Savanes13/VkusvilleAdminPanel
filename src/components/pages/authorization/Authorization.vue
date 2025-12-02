<script lang="ts" setup>
import EntranceLayout from '@/components/layout/entrance/EntranceLayout.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import PasswordInput from '@/components/shared/ui/input/PasswordInput.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
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
          <p>Вход в аккаунт</p>
        </div>
        <div class="text">
          <p>Введите почту и пароль, указанные при регистрации, чтобы войти в систему. Если забыли почту - обратитесь к администратору программы</p>
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

      <div class="authorization__register">
        <div class="no-account">
          <p>Нет аккаунта?</p>
        </div>
        <router-link to="/registration">
          <div class="register">
            <p>Зарегистрировать</p>
          </div>
        </router-link>
      </div>

      <DefaultButton
        class="default-button__size--small default-button__color-green"
      >
        Войти
      </DefaultButton>

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

.authorization__register {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  margin-bottom: 24px;
}

.no-account {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: #333333;
}

.register {
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #179C49;
}
</style>