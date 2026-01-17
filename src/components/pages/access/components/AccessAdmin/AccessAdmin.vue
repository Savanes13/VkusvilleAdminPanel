<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';
import AccessadminWorks from './composables/AccessadminWorks';

const {
  selectedItemAdmin,
  fioInputObj,
  selectArr,
  setNewSelectValue
} = AccessadminWorks();
</script>

<template>
  <div class="access-admin">
    <WrapperBlock
      class="granting-access"
    >
      <div class="granting-access__title">
        <div>
          <p>Генерация токена</p>
        </div>
        <div>
          <!-- TODO: сюда подсказку -->
        </div>
      </div>
      <div class="granting-access__content">
        <DefaultSelect
          :data="selectArr"
          :active-item="selectedItemAdmin"
          label="Роль"
          @change-value="setNewSelectValue"
        />
        <DefaultInput
          v-model:value="fioInputObj.value"
          :label="fioInputObj.label"
          :placeholder="fioInputObj.placeholder"
          :error="fioInputObj.error"
        />  
        <DefaultButton
          class="default-button__size--large default-button__color-green button-access"
        >
          Получить токен
        </DefaultButton>
      </div>
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
  // align-items: center;
  gap: 24px;
}

.button-access {
  // width: 147px;
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