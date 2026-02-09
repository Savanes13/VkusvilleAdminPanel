<script lang="ts" setup>
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { useCompanyStore } from '@/store/company/companyStore';
import logo from '@/assets/images/logo/logo.svg'
import bigAvatar from '@/assets/images/user/AvatarBig.svg'
import smallAvatar from '@/assets/images/user/AvatarSmall.svg'
import { storeToRefs } from 'pinia';
import { mainIcons } from '@/components/shared/icons/mainIcons';
import { useUserStore } from '@/store/user/userStore';
import { checkAuth, logout } from '@/api/user/apiUser';
import { computed, ref } from 'vue';

interface IDataArr {
  email: string
  id: number
  role: string
  display_name: string
};

const pageDataArr = ref<null | IDataArr>(null);
const userInfoIsOpen = ref<boolean>(false);
const companyStore = useCompanyStore();
const { selectedCompany } = storeToRefs(companyStore);
const userStore = useUserStore();

const dataSwitch = [
  {
    name: "Reo",
    text: "РЭУ"
  },
  {
    name: "Rosbioteh",
    text: "Росбиотех"
  }
];

const roleLabel = computed(() => {
  if (!pageDataArr.value) return '';
  if (pageDataArr.value.role === 'SUPER_ADMIN') return 'СуперАдмин';
  if (pageDataArr.value.role === 'ADMIN') return 'Админ';
  if (pageDataArr.value.role === 'GUEST') return 'Гость'
});

const toggleUserOpen = () => {
  if (!userInfoIsOpen.value) {
    userInfoIsOpen.value = true
  } else {
    userInfoIsOpen.value = false;
  };
};

const exitFromAccount = async () => {
  try {
    await logout();
    userStore.deleteAccessToken();
    toggleUserOpen();
  } catch (error) {
    console.error('ошибка выхода из аккаунта')
  }
}

const getPageData = async () => {
  try {
    const respone = await checkAuth();
    pageDataArr.value = respone;
  } catch (error) {
    console.error("ошибка при загрузке страницы")
  }
}
getPageData();
</script>

<template>
  <div class="header_wrap">
    <div 
      class="header"
      v-if="pageDataArr"
    >
      <div class="header__left">
        <router-link to="/">
          <div class="logo">
            <img :src="logo" alt="logo"/>
          </div>
        </router-link>
        <div class="select-collaboration">
          <DefaultSwitch
            v-model:value="selectedCompany"
            :data="dataSwitch"
            :header-switch="true"
          />
        </div>
      </div>
      <div 
        class="header__right"
        @click="toggleUserOpen"
      >
        <div class="user-icon user-icon-desktop--top">
          <img :src="bigAvatar" alt="">
        </div>
        <div 
          class="user-icon user-icon-mobile--top"
          v-if="!userInfoIsOpen"
        >
          <img :src="smallAvatar" alt="">
        </div>
        <div class="user-fields">
          <div class="user-fields__name">
            <p>{{ pageDataArr.display_name }}</p>
          </div>
          <div class="user-fields__role">
            <p>{{ roleLabel }}</p>
          </div>
        </div>
        <div class="select-icon">
          <span
            class="svg"
            :class="{'chevron-rotate' : userInfoIsOpen}"
            v-html="mainIcons['chevronDown']"
          ></span>
        </div>
      </div>
      <transition :name="'fade-slide'" mode="out-in">
        <div 
          v-if="userInfoIsOpen"
          class="header__hiden"
        >
          <div class="wrap-block">
            <div class="wrap-hiden">
              <div>
                <span
                  class="svg"
                  v-html="mainIcons['exit']"
                ></span>
              </div>
              <div
                @click="exitFromAccount"
              >
                <p>Выйти</p>
              </div>
            </div>
            <div class="hidden-user-mobile">
              <div class="user-icon">
                <img :src="bigAvatar" alt="">
              </div>
              <div class="user-fields user-fields--mobile">
                <div class="user-fields__name">
                  <p>{{ pageDataArr.display_name }}</p>
                </div>
                <div class="user-fields__role">
                  <p>{{ roleLabel }}</p>
                </div>
              </div>
            </div>
          </div>
          <div 
            class="close-block"
            @click="toggleUserOpen"
          >
            <span
              v-html="mainIcons['close']"
            ></span>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fadeFast">
      <div 
        @click="toggleUserOpen"
        class="overlay"
        v-if="userInfoIsOpen"
      ></div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.header {
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  background: color.$colorBackgroundWhite;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  margin-bottom: 40px;
  position: relative;
  z-index: 100;
}

.header__left {
  display: flex;
  align-items: center;
  gap: 24px;
}

// .user-icon {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 50px;
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 20px;
//   background: color.$colorStrokeAccent;
//   color: color.$colorIconWhite;
// }

.user-icon-mobile--top {
  display: none;
}

.header__right {
  display: flex;
  gap: 8px;
  cursor: pointer;
}

.user-fields {
  display: flex;
  flex-direction: column;
}

.hidden-user-mobile {
  display: none;
}

.user-fields__name {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorIconPrimary;
}

.user-fields__role {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: color.$colorIconSecondary;
}

.header__hiden {
  position: absolute;
  right: 0px;
  top: 79px;
  width: 223px;
  height: 73px;
  padding: 16px;
  border-radius: 16px;
  background: color.$colorIconWhite;
  box-shadow: 0px 15px 36.8px 0px #00000026;
}

.wrap-hiden {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.chevron-rotate {
  transform: rotate(180deg);
}

.close-block {
  display: none;
  cursor: pointer;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity transition.$medium, transform transition.$medium, max-height transition.$medium;
  overflow: hidden;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-14px);
  max-height: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 300px;
}

@media (max-width: 940px) {
  .logo {
    display: none;
  }

  .header__left {
    gap: 0px;
  }
}

@media (max-width: 768px) {
  .header {
    border-radius: 0px;
    border-bottom: 1px solid color.$colorSeparator;
    margin-bottom: 20px;
  }

  .overlay {
    display: block;
  }

  .header__left {
    gap: 0px;
  }

  .user-fields {
    display: none;
  }

  .hidden-user-mobile {
    display: flex;
    gap: 8px;
  }

  .close-block {
    display: block;
  }

  .select-icon {
    display: none;
  }

  .header__hiden {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    height: 144px;
    width: 100%;
    right: 0px;
    left: 0px;
    top: 74px;
    padding: 24px;
    border-radius: 0px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: none;
  }

  .wrap-block {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    height: 100%;
  }

  .user-fields--mobile {
    display: block;
  }

  .user-icon-desktop--top {
    display: none;
  }

  .user-icon-mobile--top {
    display: flex;
  }

  .user-fields__name {
    max-width: none;
    overflow: auto;
  }
}

@media (max-width: 500px) {
  .header {
    padding: 8px 24px;
  }

  .header__hiden {
    top: 48px;
  }

  .user-icon-mobile--top {
    width: 32px;
    height: 32px;
  }
}
</style>