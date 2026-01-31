<script lang="ts" setup>
import { mainIcons } from '@/components/shared/icons/mainIcons';
import MobileItem from '../mobileItem/MobileItem.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const hideBlockIsOpen = ref<boolean>(false);

const toggleHideBlock = () => {
  hideBlockIsOpen.value = !hideBlockIsOpen.value
}
</script>

<template>
  <div class="mobile-block">
    <transition :name="'fade-slide'" mode="out-in">
      <div 
        class="hide-mobile"
        v-if="hideBlockIsOpen"
      >
        <MobileItem
          :is-active="true"
          icon="enrolle"
          text="Абитуриенты"
          path="/applicants"
          :hide-panel="true"
        />
        <MobileItem
          :is-active="true"
          icon="expert"
          text="Эксперты"
          path="/experts"
          :hide-panel="true"
        />
        <MobileItem
          :is-active="true"
          icon="lock"
          text="Доступы"
          path="/access"
          :hide-panel="true"
        />
        <MobileItem
          :is-active="true"
          icon="meeting"
          text="Собеседования"
          path="/interviews"
          :hide-panel="true"
        />
      </div>
    </transition>
    <div 
      class="mobile-panel"
      :class="{'mobile-panel--without-border' : hideBlockIsOpen}"
    >
      <MobileItem
        :is-active="route.path === '/dashboard' || route.path === '/'"
        icon="star"
        text="Дашборд"
        path="/dashboard"
      />
      <MobileItem
        :is-active="route.path === '/stages'"
        icon="stages"
        text="Этапы"
        path="/stages"
      />
      <MobileItem
        :is-active="route.path === '/content'"
        icon="content"
        text="Контент"
        path="/content"
      />
      <div 
        class="still-button"
        :class="{'still-button--active' : hideBlockIsOpen}"
        @click="toggleHideBlock"
      >
        <div>
          <span
            class="svg"
            v-html="mainIcons['menu']"
          ></span>
        </div>
        <div>
          <p>Еще</p>
        </div>
      </div>
    </div>
    <transition name="fadeFast">
      <div 
        v-if="hideBlockIsOpen"
        @click="toggleHideBlock"
        class="overlay"
      ></div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.mobile-block {
  display: none;
}

.mobile-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 50px;
  background: color.$colorTextWhite;
  border-top: 1px solid color.$colorSeparator;
  z-index: 101;
}

.mobile-panel--without-border {
  border-top: 1px solid transparent;
}

.mobile-panel > * {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.still-button {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: color.$colorTextSecondary
}

.hide-mobile {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
  width: 100%;
  right: 0px;
  left: 0px;
  bottom: 50px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background: color.$colorTextWhite;
  padding: 24px;
  z-index: 101;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.still-button--active {
  .svg {
    :deep(svg path) {
      fill: color.$colorTextPrimary;
    }
  }
  color: color.$colorTextPrimary;
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

@media (max-width: 768px) {
  .mobile-block {
    display: block;
  }

  .overlay {
    display: block;
  }
}
</style>