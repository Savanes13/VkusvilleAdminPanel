<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import TextArea from '@/components/shared/ui/textArea/TextArea.vue';
import { computed, ref, watch } from 'vue';
import { mainIcons } from '@/components/shared/icons/mainIcons';

interface ITokenWindowProps {
  token: string;
}

const {
  token
} = defineProps<ITokenWindowProps>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closeWindow = () => {
  emit("close");
};

const copyToken = () => {
  navigator.clipboard.writeText(token)
  .catch(() => {
    console.error('Не удалось скопировать токен:');
  });
};
</script>

<template>
  <BackgroundModal>
    <div 
      class="token-window"
      v-clickOutside="closeWindow"
    >
      <ModalWindow
        name="Сгенерированный токен"
        @close="closeWindow"
      >    
        <div class="token-window__text">
          <p>Скопируйте токен для дальнейшего использования.</p>
        </div>
        <div class="token-window__text">
          <p>Если закроете это окно, то сможете найти токен в таблице «Неиспользованные токены»</p>
        </div>
        <div class="token-window__token-block">
          <div class="created-token">
            <p>{{ token }}</p>
          </div>
          <div 
            class="copy-token"
            @click="copyToken"
          >
            <span
              class="svg"
              v-html="mainIcons['copy']"
            ></span>
          </div>
        </div>
        <div class="buttons-block">
          <DefaultButton
             class="default-button__size--large default-button__color-gray"
             @click="closeWindow"
          >
            Закрыть
          </DefaultButton>
          <DefaultButton
            class="default-button__size--large default-button__color-green"
            @click="copyToken"
          >
            Скопировать
          </DefaultButton>
        </div>
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.token-window {
  width: 438px;
}

.buttons-block {
  margin-top: 24px;
  display: flex;
  gap: 16px;
}

.token-window__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 10px;
}

.token-window__token-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #DDE0E8;
  color: color.$colorTextPrimary;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding: 8px;
}

.copy-token {
  cursor: pointer;
}

.svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>