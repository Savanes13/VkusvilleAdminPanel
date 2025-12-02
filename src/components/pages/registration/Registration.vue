<script lang="ts" setup>
import EntranceLayout from '@/components/layout/entrance/EntranceLayout.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import PasswordInput from '@/components/shared/ui/input/PasswordInput.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import CheckMark from '@/components/shared/ui/checkbox/CheckMark.vue';
import type { IInputDefaultProps, IInputPasswordProps } from '@/types/inputs/types';
import { reactive, ref } from 'vue';

const rememberUser = ref<boolean>(false);

const emailInputObj = reactive<IInputDefaultProps>({
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

const repeatPasswordInputObj = reactive<IInputPasswordProps>({
  value: '',
  label: 'Повторить пароль',
  placeholder: 'Повторить пароль',
  error: {
    show: false,
    text: ''
  },
});

const tokenInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Токен для получения прав',
  placeholder: 'Токен для получения прав',
  error: {
    show: false,
    text: ''
  },
});
</script>

<template>
  <EntranceLayout>
    <div class="registration">
      <div class="registration__info">
        <div class="title">
          <p>Регистрация</p>
        </div>
        <div class="text">
          <p>Для регистрации нужна почта и токен доступа — он подтверждает вашу роль. Получите токен у администратора программы</p>
        </div>
      </div>
      <div class="registration__inputs">
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
        <PasswordInput
          class="input-item"
           v-model:value="repeatPasswordInputObj.value"
          :label="repeatPasswordInputObj.label"
          :placeholder="repeatPasswordInputObj.placeholder"
          :error="repeatPasswordInputObj.error"
        />
        <DefaultInput
          class="input-item"
          v-model:value="tokenInputObj.value"
          :label="tokenInputObj.label"
          :placeholder="tokenInputObj.placeholder"
          :error="tokenInputObj.error"
        />
      </div>
      <DefaultButton
        class="default-button__size--small default-button__color-green"
      >
        Зарегистрировать аккаунт
      </DefaultButton>
      <div class="checkbox-block">
        <CheckMark
          v-model:state="rememberUser"
        />
        <div class="checkbox-block__text">
          <p>Запомнить меня на этом устройстве</p>
        </div>
      </div>
      <div class="register__authorization">
        <div class="have-account">
          <p>Есть аккаунт?</p>
        </div>
        <router-link to="/authorization">
          <div class="auth">
            <p>Войти</p>
          </div>
        </router-link>
      </div>
    </div>
  </EntranceLayout>
</template>

<style>
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

.checkbox-block {
  display: flex;
  gap: 12px;
  padding: 10px 0px;
  margin-top: 10px;
}

.checkbox-block__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
}

.register__authorization {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  margin-top: 24px;
}

.have-account {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: #333333;
}

.auth {
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #179C49;
}
</style>