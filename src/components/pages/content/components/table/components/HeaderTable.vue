<script lang="ts" setup>
import HintItem from '@/components/shared/elements/HintItem.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const viewportWidth = ref(window.innerWidth);

const updateWidth = () => {
  viewportWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<template>
  <div class="table-header">
    <div class="table-header__item text-item">
      <div>
        <p>Текст</p>
      </div>
      <div>
        <HintItem
          text="Техническое сообщение, которое бот отправляет пользователю. Текст можно редактировать, не меняя ключи"
          :width="viewportWidth > 440 ? 294 : 200"
          :height="viewportWidth > 440 ? 80 : 124"
          position="bottom-left"
        />
      </div>
    </div>
    <div class="table-header__item key-item">
      <div>
        <p>Ключ</p>
      </div>
      <div>
        <HintItem
          text="Уникальный ключ сообщения. По нему бот выбирает текст. Изменение ключа нарушит работу бота"
          :width="viewportWidth > 440 ? 294 : 200"
          :height="viewportWidth > 440 ? 80 : 124"
          position="bottom-left"
        />
      </div>
    </div>
    <div class="table-header__item empty-item"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.table-header {
  display: flex;
  border: 1px solid #DDE0E8;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: color.$colorBackgroundSecondary;
}

.table-header__item {
  display: flex;
  gap: 4px;
  height: 44px;
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.text-item {
  flex: 560;
}

.key-item {
  flex: 330;
}

.empty-item {
  flex: 190;
  border-right: none
}
</style>