<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import TextArea from '@/components/shared/ui/textArea/TextArea.vue';
import { ref } from 'vue';

interface IContentWindowProps {
  text: string;
  keyLine: string;
  requiredKeys: string[];
}

const {
  text,
  keyLine,
  requiredKeys
} = defineProps<IContentWindowProps>();

const textWindowValue = ref<string>(text);

// TODO: тут надо будет делаать проверки на ключи и так далее

// TODO: надо будет сделать эмиты которые буду отправлять наверх данные о сохранении

const saveNewData = () => {
  // сохранить измененные данные
};

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closeWindow = () => {
  emit("close");
};
</script>

<template>
  <BackgroundModal>
    <div 
      class="content-window"
      v-clickOutside="closeWindow"
    >
      <ModalWindow
        name="Редактирование текста"
        @close="closeWindow"
      > 
        <div class="content-window__warning">
          <p>Не редактируйте ключи в тексте, иначе сохранить изменения будет невозможно</p>
        </div>
        <div class="content-window__all-key">
          <div class="title-key">
            <p>Полный ключ текста</p>
          </div>
          <div class="value-key">
            <p>{{ keyLine }}</p>
          </div>
        </div>
        <TextArea
          class="content-window__text-area"
          v-model:value="textWindowValue"
          :height="136"
          label="Текст"
        />
        <div class="buttons-block">
          <DefaultButton
             class="default-button__size--large default-button__color-gray"
          >
            Отменить
          </DefaultButton>
          <DefaultButton
            class="default-button__size--large default-button__color-green"
            @click="saveNewData"
          >
            Сохранить
          </DefaultButton>
        </div>
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.content-window {
  width: 560px;
}

.content-window__warning {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 24px;
}

.content-window__all-key {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.title-key {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
}

.value-key {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.buttons-block {
  display: flex;
  gap: 16px;
}

.content-window__text-area {
  margin-bottom: 24px;
}
</style>