<script lang="ts" setup>
import ContentWindow from '@/components/shared/elements/modalWindow/content/ContentWindow.vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';
import { ref } from 'vue';

const editModalVisibility = ref<boolean>(false);

interface ILineTableProps {
  text: string;
  keyLine: string;
  format_keys: string[];
  lastLine: boolean;
  empty?: boolean;
}

const {
  text,
  keyLine,
  format_keys,
  lastLine = false,
  empty
} = defineProps<ILineTableProps>();

const emit = defineEmits<{
  (e: 'changeText', value: string, key: string): void;
}>();

const changeText = (text: string) => {
  emit('changeText', text, keyLine);
}

const openWindow = () => {
  editModalVisibility.value = true;
};

const closeWindow = () => {
  editModalVisibility.value = false;
};
</script>

<template>
  <div 
    class="line-table"
    :class="{'line-table--last' : lastLine}"
  >
    <div class="line-table__item text-item">
      <p>{{ text }}</p>
    </div>
    <div class="line-table__item key-item">
      <p>{{ keyLine }}</p>
    </div>
    <div class="line-table__item empty-item">
      <IconButton
        @click="openWindow"
        class="button-icon__color-green-transparent"
        icon="edit"
        color-icon="transparent"
        v-if="!empty"
      />
    </div>
    <transition name="fadeFast">
      <ContentWindow
        v-if="editModalVisibility"
        :key-line="keyLine"
        :text="text"
        :required-keys="format_keys"
        @close="closeWindow"
        @change-text="changeText"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.line-table {
  display: flex;
  border-bottom: 1px solid #DDE0E8;
  border-left: 1px solid #DDE0E8;
  border-right: 1px solid #DDE0E8;
}

.line-table--last {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.line-table__item {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.text-item {
  flex: 560;
  overflow: hidden;  
  white-space: nowrap;     
  text-overflow: ellipsis;
}

.key-item {
  flex: 330;
}

.empty-item {
  justify-content: end;
  flex: 190;
  border-right: none
}
</style>