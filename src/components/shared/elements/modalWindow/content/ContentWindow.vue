<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import TextArea from '@/components/shared/ui/textArea/TextArea.vue';
import { computed, ref, watch } from 'vue';

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
const showHint = ref<boolean>(false);

watch(() => textWindowValue.value, () => {
  showHint.value = false;
});

const allMissingKeysText = computed(() => {
  return requiredKeys.filter(key => {
    const wrappedKey = `{${key}}`;
    return !textWindowValue.value.includes(wrappedKey);
  });
});

const changeText = () => {
  if (allMissingKeysText.value.length > 0) {
    showHint.value = true;
    return;
  };
  emit('changeText', textWindowValue.value);
  emit('close');
};

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'changeText', value: string): void;
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
        :have-mobile-type="true"
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
        <div 
          class="content-window__required-keys"
          v-if="requiredKeys.length > 0"
        >
          <div 
            class="key-item"
            :class="{'key-item--missing' : allMissingKeysText.includes(item)}"
            v-for="(item, index) in requiredKeys"
            :key="index"
          >
            <p>{{ item }}</p>
          </div>
        </div>
        <transition :name="'fade-slide'" mode="out-in">
          <div 
            class="hint-key"
            v-if="showHint"
          > 
            <div class="hint-key__title">
              <p>Некорректный ключ</p>
            </div>
            <div class="hint-key__text">
              <p>Исправьте ключ, выделенный красным, или отмените редактирование текста ниже</p>
            </div>
          </div>
        </transition>
        <div class="buttons-block">
          <DefaultButton
             class="default-button__size--large default-button__color-gray"
          >
            Отменить
          </DefaultButton>
          <DefaultButton
            class="default-button__size--large default-button__color-green"
            @click="changeText"
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
  margin-top: 24px;
  display: flex;
  gap: 16px;
}

.content-window__required-keys {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.key-item {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0%;
  color: color.$colorTextAcccent;
}

.key-item--missing {
  color: color.$colorTextNegative;
}

.hint-key {
  padding: 20px;
  border-radius: 16px;
  background: color.$colorBackgroundWarning;
  margin-top: 24px;
}

.hint-key__title {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #A15F01;
  margin-bottom: 8px;
}

.hint-key__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #A15F01;
}

@media (max-width: 400px) {
  .content-window__all-key {
    flex-direction: column;
    gap: 8px;
    align-items: start;
  }
}
</style>