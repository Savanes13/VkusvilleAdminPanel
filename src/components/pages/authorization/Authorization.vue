<script lang="ts" setup>
import EntranceLayout from '@/components/layout/entrance/EntranceLayout.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import PasswordInput from '@/components/shared/ui/input/PasswordInput.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import CheckMark from '@/components/shared/ui/checkbox/CheckMark.vue';
import { entranceIcons } from '@/components/shared/icons/entrance/icons';
import type { IInputPasswordProps } from '@/types/inputs/types';
import logo from '@/assets/images/logo/logo.svg';
import smallLogo from '@/assets/images/logo/smallLogo.svg';
import { reactive, ref } from 'vue';

const rememberUser = ref<boolean>(false);

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
      <div class="authorization__wrap">
        <div class="authorization__logo">
          <img 
            :src="logo" alt="logo"
            class="desktop-logo"
          />
          <img 
            :src="smallLogo" alt="logo"
            class="mobile-logo"
          >
        </div>
        <div class="authorization__info">
          <div class="title">
            <p>Вход в аккаунт</p>
          </div>
          <div class="text">
            <p>Введите почту и пароль, указанные при регистрации, чтобы войти в систему. Если забыли почту — обратитесь на <span>рабочий аккаунт</span></p>
          </div>
        </div>
        <div class="authorization__inputs">
          <DefaultInput
            class="input-item"
            v-model:value="emailInputObj.value"
            :label="emailInputObj.label"
            :error="emailInputObj.error"
          />
          <PasswordInput
            class="input-item"
             v-model:value="passwordInputObj.value"
            :label="passwordInputObj.label"
            :error="passwordInputObj.error"
          />
        </div>
        <DefaultButton
          class="default-button__size--large default-button__color-green"
        >
          Войти
        </DefaultButton>
        <div class="checkbox-block">
          <CheckMark
            v-model:state="rememberUser"
          />
          <div class="checkbox-block__text">
            <p>Запомнить меня</p>
          </div>
        </div>
      </div>
      <div class="authorization__register">
        <div class="no-account">
          <p>Нет аккаунта?</p>
        </div>
        <router-link to="/registration">
          <div class="register">
            <div>
              <p>Зарегистрировать</p>
            </div>
            <div>
              <span
                v-html="entranceIcons['chevronRight']"
              ></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </EntranceLayout>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.authorization__wrap {
  padding: 40px;
  background: color.$colorBackgroundWhite;
  border-radius: 24px;
}

.authorization__logo {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  margin-bottom: 16px;
}

.text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 24px;
}

.text span {
  color: color.$colorTextAcccent;
}

.authorization__inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.authorization__register {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  margin-top: 24px;
}

.no-account {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: #333333;
}

.register {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #179C49;
}

.no-account,
.register {
  line-height: 24px;
}

.register span {
  display: flex;
  align-items: center;
}

.register svg {
  display: block;
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

.mobile-logo {
  display: none;
}

@media (max-width: 500px) {
  .authorization__register {
    padding: 10px 24px;
  }
}

@media (max-width: 425px) {
  .authorization__wrap {
    padding: 24px;
  }

  .desktop-logo {
    display: none;
  }

  .mobile-logo {
    display: block;
    margin: 0 auto;
  }


  .authorization__logo {
    margin-bottom: 20px;
  }

  .title {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 12px;
  }

  .text {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  .authorization__inputs {
    gap: 12px;
    margin-bottom: 20px;
  }

  .checkbox-block {
    margin-top: 8px;
    gap: 10px;
  }

  .authorization__register {
    margin-top: 20px;
  }

  .no-account {
    font-size: 14px;
    line-height: 20px;
  }

  .register {
    font-size: 14px;
    line-height: 16px;
    gap: 4px;
  }
}
</style>