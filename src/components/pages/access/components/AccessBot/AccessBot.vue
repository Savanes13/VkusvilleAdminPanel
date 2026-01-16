<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import PhoneInput from '@/components/shared/ui/input/PhoneInput.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { ref } from 'vue';
import TableExperts from './components/table/TableExperts.vue';


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

const phoneInputObj = ref<IInputDefaultProps>({
  value: '',
  label: 'Номер телефона',
  placeholder: '+ 7',
  error: {
    show: false,
    text: 'phoneNumber'
  },
});
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
        <PhoneInput
          v-model:value="phoneInputObj.value"
          :label="phoneInputObj.label"
          :placeholder="phoneInputObj.placeholder"
          :error="phoneInputObj.error"
        />
        <DefaultButton
          class="default-button__size--large default-button__color-green button-access"
        >
          Выдать доступ
        </DefaultButton>
      </div>
    </WrapperBlock>

    <WrapperBlock class="table-bot">
      <div class="table-bot__title-block">
        <div>
          <p>Роли экспертов</p>
        </div>
        <div>
          <!-- TODO: подсказка -->
        </div>
      </div>
      <TableExperts/>
    </WrapperBlock>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.granting-access {
  margin-bottom: 24px;
}

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

.table-bot__title-block {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}
</style>