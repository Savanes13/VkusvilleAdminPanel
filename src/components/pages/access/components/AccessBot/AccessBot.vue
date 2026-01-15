<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';


interface IAccessBotProps {
  data: any;
  activeSelect: number;
}
const {
  data,
  activeSelect
} = defineProps<IAccessBotProps>();

const emit = defineEmits<{
  (e: 'changeValueSelect', id: number): void;
}>();

const setNewSelectValue = (id: number) => {
  emit('changeValueSelect', id);
};
</script>

<template>
  <div class="access-bot">

    <WrapperBlock
      class="granting-access"
    >
      <div class="granting-access__title">
        <div>
          <p>Выдача доступа</p>
        </div>
        <div>
          <!-- TODO: сюда подсказку -->
        </div>
      </div>

      <div class="granting-access__content">

        <DefaultSelect
          :data="data.select"
          :active-item="activeSelect"
          label="Роль"
          @change-value="setNewSelectValue"
        />

        <DefaultButton
          class="default-button__size--large default-button__color-green button-access"
        >
          Выдать доступ
        </DefaultButton>

      </div>
    </WrapperBlock>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.granting-access__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}

.granting-access__content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.button-access {
  margin-top: 20px;
}
</style>