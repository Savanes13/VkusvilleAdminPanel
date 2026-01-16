<script lang="ts" setup>
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import PhoneInput from '@/components/shared/ui/input/PhoneInput.vue';
import DefaultSelect from '@/components/shared/ui/select/DefaultSelect.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { reactive, ref, watch } from 'vue';
import TableExperts from './components/table/TableExperts.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import { createAccessAdmin, getContentAccessAdmins } from '@/api/pages/access/apiAccess';
import type { TDataAdmins } from '@/types/pages/access/accessTypes';

const emit = defineEmits<{
  (e: 'changeValueSelect', id: number): void;
}>();

const pageDataArr = ref<null | TDataAdmins>(null);
const selectedItemBot = ref<number>(1);

const setNewSelectValue = (id: number) => {
  selectedItemBot.value = id;
};

const phoneInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Номер телефона',
  placeholder: '+ 7',
  error: {
    show: false,
    text: 'phoneNumber'
  },
});

const fioInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'ФИО*',
  placeholder: 'Введите ФИО',
  error: {
    show: false,
    text: ''
  },
});

const selectArr = [
  {
    id: 1,
    value: "Эксперт 1 уровня"
  },
  {
    id: 2,
    value: "Эксперт 2 уровня"
  },
  {
    id: 3,
    value: "Менеджер продвижения"
  }
];

watch(() => phoneInputObj.value, () => {
  phoneInputObj.error.show = false;
});

watch(() => fioInputObj.value, () => {
  fioInputObj.error.show = false;
});

const numberNormalize = () => {
  return phoneInputObj.value.replace(/\D/g, '');
};

const checkingPhoneValidity = () => {
  if (!phoneInputObj.value) {
    phoneInputObj.error.show = true;
    phoneInputObj.error.text = 'Поле не заполнено';
    return false; 
  }
  if (phoneInputObj.value.length < 16) {
    phoneInputObj.error.show = true;
    phoneInputObj.error.text = 'Введите номер полностью';
    return false; 
  }
  return true;
};

const checkingFioValidity = () => {
 if (!fioInputObj.value) {
    fioInputObj.error.show = true;
    fioInputObj.error.text = 'Поле не заполнено';
    return false; 
  };
  return true;
};

const checkingFormValidity = () => {
  const isPhoneValid = checkingPhoneValidity();
  const isFioValid = checkingFioValidity();
  return isPhoneValid && isFioValid;
};

const selectRole = () => {
  if (selectedItemBot.value === 1) return "expert1"
  if (selectedItemBot.value === 2) return "expert2"
  if (selectedItemBot.value === 3) return "manager"
  return ""
};

const createNewAdmin = async () => {
  try {
    if(!checkingFormValidity()) return;
    await createAccessAdmin(fioInputObj.value, numberNormalize(), selectRole());
    phoneInputObj.value = '';
    fioInputObj.value = '';
  } catch (error) {
    console.error("ошибка создания пользователя");
  };
};

const getPageData = async () => {
  try {
    const response = await getContentAccessAdmins();
    pageDataArr.value = response.admins;
  } catch (error) {
    
  }
}
getPageData()
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