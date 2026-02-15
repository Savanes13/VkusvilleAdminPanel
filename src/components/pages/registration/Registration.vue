<script lang="ts" setup>
import EntranceLayout from '@/components/layout/entrance/EntranceLayout.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import PasswordInput from '@/components/shared/ui/input/PasswordInput.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import CheckMark from '@/components/shared/ui/checkbox/CheckMark.vue';
import { entranceIcons } from '@/components/shared/icons/entrance/icons';
import logo from '@/assets/images/logo/logo.svg';
import smallLogo from '@/assets/images/logo/smallLogo.svg';
import type { IInputDefaultProps, IInputPasswordProps } from '@/types/inputs/types';
import { reactive, ref, watch } from 'vue';
import { register } from '@/api/user/apiUser';

// const rememberUser = ref<boolean>(false);

const fioInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'ФИО',
  placeholder: 'Введите ФИО',
  error: {
    show: false,
    text: ''
  },
});

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

watch(() => fioInputObj.value, () => {
  fioInputObj.error.show = false;
});

watch(() => emailInputObj.value, () => {
  emailInputObj.error.show = false;
});

watch(() => passwordInputObj.value, () => {
  passwordInputObj.error.show = false;
});

watch(() => repeatPasswordInputObj.value, () => {
  repeatPasswordInputObj.error.show = false;
});

watch(() => tokenInputObj.value, () => {
  tokenInputObj.error.show = false;
});

const checkingFioValidity = () => {
  if (!fioInputObj.value) {
    fioInputObj.error.show = true;
    fioInputObj.error.text = 'Поле не заполнено';
    return;
  }
  return true;
};

const checkingEmailValidity = () => {
  if (!emailInputObj.value) {
    emailInputObj.error.show = true;
    emailInputObj.error.text = 'Поле не заполнено';
    return;
  }
  return true;
};

const checkingPasswordValidity = () => {
 if (!passwordInputObj.value) {
    passwordInputObj.error.show = true;
    passwordInputObj.error.text = 'Поле не заполнено';
    return false; 
  };
  return true;
};

const checkingRepeatPasswordValidity = () => {
 if (!repeatPasswordInputObj.value) {
    repeatPasswordInputObj.error.show = true;
    repeatPasswordInputObj.error.text = 'Поле не заполнено';
    return false; 
  };
  if (passwordInputObj.value !== repeatPasswordInputObj.value) {
    passwordInputObj.error.show = true;
    passwordInputObj.error.text = '';
    repeatPasswordInputObj.error.show = true;
    repeatPasswordInputObj.error.text = 'Пароли не совпадают';
    return false;
  };
  return true;
};

const checkingTokenValidity = () => {
 if (!tokenInputObj.value) {
    tokenInputObj.error.show = true;
    tokenInputObj.error.text = 'Поле не заполнено';
    return false; 
  };
  return true;
};

const checkingFormValidity = () => {
  const isFioValid = checkingFioValidity();
  const isEmailValid = checkingEmailValidity();
  const isPasswordValid = checkingPasswordValidity();
  const isRepeatPasswordValid = checkingRepeatPasswordValidity();
  const isTokenValid = checkingTokenValidity();
  return isFioValid && isEmailValid && isPasswordValid && isRepeatPasswordValid && isTokenValid;
};

const registerUser = async () => {
  try {
    if(!checkingFormValidity()) return;
    await register(fioInputObj.value, emailInputObj.value, passwordInputObj.value, tokenInputObj.value);
    // TODO: сюда установку токена
  } catch (error) {
    console.error('ошибка при авторизации пользователя')
  };
};
</script>

<template>
  <EntranceLayout>
    <div class="registration">
      <div class="registration__wrap">
        <div class="registration__logo">
          <img 
            :src="logo" alt="logo"
            class="desktop-logo"
          />
          <img 
            :src="smallLogo" alt="logo"
            class="mobile-logo"
          >
        </div>
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
            v-model:value="fioInputObj.value"
            :label="fioInputObj.label"
            :error="fioInputObj.error"
          />
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
          <PasswordInput
            class="input-item"
             v-model:value="repeatPasswordInputObj.value"
            :label="repeatPasswordInputObj.label"
            :error="repeatPasswordInputObj.error"
          />
          <DefaultInput
            class="input-item"
            v-model:value="tokenInputObj.value"
            :label="tokenInputObj.label"
            :error="tokenInputObj.error"
          />
        </div>
        <DefaultButton
          class="default-button__size--large default-button__color-green"
          @click="registerUser"
        >
          Зарегистрировать аккаунт
        </DefaultButton>
        <!-- <div class="checkbox-block">
          <CheckMark
            v-model:state="rememberUser"
          />
          <div class="checkbox-block__text">
            <p>Запомнить меня</p>
          </div>
        </div> -->
      </div>
      <div class="register__authorization">
        <div class="have-account">
          <p>Уже есть аккаунт?</p>
        </div>
        <router-link to="/authorization">
          <div class="auth">
            <div>
              <p>Войти</p>
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

.registration__wrap {
  padding: 40px;
  background: color.$colorBackgroundWhite;
  border-radius: 24px;
}

.registration__logo {
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

.registration__inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
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
  display: flex;
  gap: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #179C49;
}

.have-account,
.auth {
  line-height: 24px;
  align-items: center;
}

.auth span {
  display: flex;
  align-items: center;
}

.auth svg {
  display: block;
}

.mobile-logo {
  display: none;
}

@media (max-width: 500px) {
  .register__authorization {
    padding: 10px 24px;
  }
}

@media (max-width: 425px) {
  .registration__wrap {
    padding: 24px;
  }

  .desktop-logo {
    display: none;
  }

  .mobile-logo {
    display: block;
    margin: 0 auto;
  }

  .registration__logo {
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

  .registration__inputs {
    gap: 12px;
    margin-bottom: 20px;
  }

  .checkbox-block {
    margin-top: 8px;
    gap: 10px;
  }

  .register__authorization {
    margin-top: 20px;
  }

  .have-account {
    font-size: 14px;
    line-height: 20px;
  }

  .auth {
    font-size: 14px;
    line-height: 16px;
    gap: 4px;
  }
}
</style>