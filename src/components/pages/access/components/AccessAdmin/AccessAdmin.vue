<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';
import AccessadminWorks from './composables/AccessadminWorks';
import TableAdmin from './components/TableAdmin/TableAdmin.vue';
import TableToken from './components/TableToken/TableToken.vue';
import TokenWindow from '@/components/shared/elements/modalWindow/access/TokenWindow.vue';

const {
  selectedItemAdmin,
  selectArr,
  tokenTableArr,
  adminTableArr,
  showTokenWindow,
  createdToken,
  setNewSelectValue,
  createToken,
  deleteToken,
  deleteAdmin,
  closeWindow
} = AccessadminWorks();
</script>

<template>
  <div 
    class="access-admin"
    v-if="tokenTableArr && adminTableArr"
  >
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
        <DefaultButton
          class="default-button__size--large default-button__color-green button-access"
          @click="createToken"
        >
          Получить токен
        </DefaultButton>
      </div>
    </WrapperBlock>
    <WrapperBlock class="table-admins">
      <div class="table-admins__title-block table-title">
        <div>
          <p>Админы</p>
        </div>
        <div>
          <!-- TODO: подсказка -->
        </div>
      </div>
      <TableAdmin
        :data="adminTableArr"
        @delete="deleteAdmin"
      />
    </WrapperBlock>
    <WrapperBlock class="table-tokens">
      <div class="table-tokens__title-block table-title">
        <div>
          <p>Неиспользованные токены</p>
        </div>
        <div>
          <!-- TODO: подсказка -->
        </div>
      </div>
      <TableToken
        :data="tokenTableArr"
        @delete="deleteToken"
      />
    </WrapperBlock>
    <transition name="fadeFast" mode="out-in">
      <TokenWindow
        v-if="showTokenWindow"
        :token="createdToken"
        @close="closeWindow"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.granting-access {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.granting-access__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-right: 50px;
}

.granting-access__content {
  display: flex;
  flex: 1;
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

.table-admins {
  margin-bottom: 24px;
}

.table-title {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}
</style>