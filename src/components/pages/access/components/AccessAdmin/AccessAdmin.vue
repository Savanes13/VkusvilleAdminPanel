<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';
import AccessadminWorks from './composables/AccessadminWorks';
import TableAdmin from './components/TableAdmin/TableAdmin.vue';
import TableToken from './components/TableToken/TableToken.vue';
import TokenWindow from '@/components/shared/elements/modalWindow/access/TokenWindow.vue';
import HintItem from '@/components/shared/elements/HintItem.vue';

const {
  selectedItemAdmin,
  selectArr,
  tokenTableArr,
  adminTableArr,
  showTokenWindow,
  createdToken,
  viewportWidth,
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
          <HintItem
            text="Сгенерируйте токен для выдачи доступа в админку. Пользователь сможет войти, указав этот токен при регистрации"
            :width="viewportWidth > 420 ? 300 : 220"
            :height="viewportWidth > 420 ? 100 : 120"
            :position="viewportWidth > 420 ? 'bottom-center' : 'bottom-right'"
          />
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
          <HintItem
            text="Список пользователей, имеющих доступ в админку. Можно удалить пользователя. Чтобы изменить роль, выдайте новый доступ с нужной ролью"
            :width="viewportWidth > 440 ? 300 : 240"
            :height="viewportWidth > 440 ? 100 : 120"
            :position="viewportWidth > 440 ? 'bottom-left' : 'bottom-center'"
          />
        </div>
      </div>
      <div 
        class="table__hint"
        v-if="adminTableArr.length === 0"
      >
        <p>Здесь будут отображаться админы</p>
      </div>
      <div 
        class="table-wrapper"
        v-else
      >
        <TableAdmin
          class="table-block"
          :data="adminTableArr"
          @delete="deleteAdmin"
        />
      </div>
    </WrapperBlock>
    <WrapperBlock class="table-tokens">
      <div class="table-tokens__title-block table-title">
        <div>
          <p>Неиспользованные токены</p>
        </div>
        <div>
          <HintItem
            text="Токены, которые были сгенерированы, но ещё не использованы при регистрации. Их можно удалить, чтобы отозвать доступ"
            :width="viewportWidth > 420 ? 300 : 220"
            :height="viewportWidth > 420 ? 100 : 140"
            position="bottom-right"
          />
        </div>
      </div>
      <div 
        class="table__hint"
        v-if="tokenTableArr.length === 0"
      >
        <p>Здесь будут отображаться неиспользованные токены</p>
      </div>
      <div 
        class="table-wrapper"
        v-else
      >
        <TableToken
          class="table-block"
          :data="tokenTableArr"
          @delete="deleteToken"
        />
      </div>
    </WrapperBlock>
    <transition name="fadeFast" mode="out-in">
      <TokenWindow
        class="table-block"
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-right: 50px;
}

.granting-access__content {
  display: flex;
  flex: 1;
  gap: 24px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-block {
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

.table-admins {
  margin-bottom: 24px;
}

.table-title {
  display: flex;
  align-items: center;
  gap: 8px;
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

@media (max-width: 1100px) {
  .granting-access {
    align-items: stretch;
    flex-direction: column;
  }

  .granting-access__title {
    justify-content: stretch;
    margin-bottom: 20px;
    margin-right: 0px;
  }
}

@media (max-width: 425px) {
  .granting-access__content {
    flex-direction: column;
    gap: 16px;
  }
  
  .button-access {
    margin-top: 0px;
  }
}
</style>