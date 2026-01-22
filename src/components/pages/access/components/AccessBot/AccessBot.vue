<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import PhoneInput from '@/components/shared/ui/input/PhoneInput.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';
import TableExperts from './components/table/TableExperts.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import AccessbotWorks from './composables/AccessbotWorks';

const {
  pageDataArr,
  selectedItemBot,
  phoneInputObj,
  fioInputObj,
  selectArr,
  setNewSelectValue,
  createNewAdmin,
  deleteAdmin
} = AccessbotWorks();
</script>

<template>
  <div 
    class="access-bot"
    v-if="pageDataArr"
  >
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
          :data="selectArr"
          :active-item="selectedItemBot"
          label="Роль"
          @change-value="setNewSelectValue"
        />
        <PhoneInput
          v-model:value="phoneInputObj.value"
          :label="phoneInputObj.label"
          :placeholder="phoneInputObj.placeholder"
          :error="phoneInputObj.error"
        />
        <DefaultInput
          v-model:value="fioInputObj.value"
          :label="fioInputObj.label"
          :placeholder="fioInputObj.placeholder"
          :error="fioInputObj.error"
        />  
        <DefaultButton
          class="default-button__size--large default-button__color-green button-access"
          @click="createNewAdmin"
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
      <TableExperts
        :data="pageDataArr"
        @delete="deleteAdmin"
      />
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