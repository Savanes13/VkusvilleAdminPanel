<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import PhoneInput from '@/components/shared/ui/input/PhoneInput.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';
import TableExperts from './components/table/TableExperts.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import AccessbotWorks from './composables/AccessbotWorks';
import HintItem from '@/components/shared/elements/HintItem.vue';

const {
  pageDataArr,
  selectedItemBot,
  phoneInputObj,
  fioInputObj,
  selectArr,
  viewportWidth,
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
          <HintItem
            text="Выдача доступа в тех-бот проверяющим и менеджерам продвижения. Укажите роль и номер телефона — доступ в тех-бот будет привязан к этому номеру"
            :width="viewportWidth > 420 ? 300 : 220"
            :height="viewportWidth > 420 ? 120 : 160"
            :position="viewportWidth > 420 ? 'bottom-center' : 'bottom-right'"
          />
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
          <HintItem
            text="Список пользователей с доступом в тех-бот. Доступ можно удалить. Чтобы изменить роль, выдайте новый доступ с нужной ролью"
            :width="viewportWidth > 420 ? 300 : 220"
            :height="viewportWidth > 420 ? 100 : 140"
            :position="viewportWidth > 420 ? 'bottom-center' : 'bottom-right'"
          />
        </div>
      </div>
      <div 
        class="table-wrapper"
        v-if="pageDataArr.length > 0"
      >
        <TableExperts
          class="table-experts"
          :data="pageDataArr"
          @delete="deleteAdmin"
        />
      </div>
      <div
        v-else
        class="table__hint"
      >
        <p>Здесь будут отображаться роли экспертов</p>
      </div>
    </WrapperBlock>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.granting-access {
  margin-bottom: 24px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-experts {
  width: 100%;
  min-width: 1100px; 
  border-collapse: collapse;
  padding-bottom: 10px;
}

.table-wrapper::-webkit-scrollbar {
  height: 8px !important;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-track {
  background: color.$colorBackgroundSecondary;
  border-radius: 6px;
  overflow: hidden;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: color.$colorTextTertiary;
  cursor: default !important;
}

.granting-access__title {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}

.granting-access__content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.button-access {
  margin-top: 20px;
}

.table-bot__title-block {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}

.table__hint {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

@media(max-width: 1500px) {
  .granting-access__content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media(max-width: 920px) {
  .granting-access__content {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media(max-width: 768px) {
   .granting-access__content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media(max-width: 600px) {
  .granting-access__content {
    grid-template-columns: repeat(1, 1fr);
  }

  .granting-access__content {
    gap: 16px;
  }
}
</style>