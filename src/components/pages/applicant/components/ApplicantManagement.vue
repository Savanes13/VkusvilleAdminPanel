<script lang="ts" setup>
import { giveMoreDaysForWork, moveToNextStage } from '@/api/pages/applicant/apiApplicant';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const dayInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Дополнительное время',
  placeholder: 'Количество дней',
  error: {
    show: false,
    text: ''
  },
});

const route = useRoute();
const applicantId = route.params.id;
const isDayModalOpen = ref<boolean>(false);
const isStageModalOpen = ref<boolean>(false);

const toggleDayModal = () => {
  isDayModalOpen.value = !isDayModalOpen.value;
};

const toggleStageModal = () => {
  isStageModalOpen.value = !isStageModalOpen.value;
};

const daysToSeconds = () => {
  const value = Number(dayInputObj.value);
  if (!Number.isFinite(value)) {
    return 0;
  }
  return value * 24 * 60 * 60;
};

const giveMoreDays = async () => {
  try {
    if (!applicantId) return
    await giveMoreDaysForWork(Number(applicantId), daysToSeconds());
  } catch (error) {
    console.error('ошибка при выдаче доп времени')
  }
}

const moveNextStage = async () => {
  try {
    if (!applicantId) return
    await moveToNextStage(Number(applicantId));
  } catch (error) {
    console.error('ошибка при переводе на следующий этап')
  }
}
</script>

<template>
  <div class="applicant-management">
    <div class="applicant-management__title">
      <p>Управление</p>
    </div>
    <div class="applicant-management__content">
      <div 
        class="management-item" 
        @click="toggleDayModal"
      >
        <div class="management-item__text">
          <p>Дать дополнительное время</p>
        </div>
        <div>
          <!-- hint -->
        </div>
        <div 
          class="management-item__modal"
          v-if="isDayModalOpen"
          v-clickOutside="toggleDayModal"
          @click.stop
        >
          <DefaultInput
            class="day-input"
            v-model:value="dayInputObj.value"
            :label="dayInputObj.label"
            :placeholder="dayInputObj.placeholder"
            :error="dayInputObj.error"
          />  
          <DefaultButton
            class="default-button__size--large default-button__color-green"
            @click="giveMoreDays"
          >
            Выдать
          </DefaultButton>
        </div>
      </div>
      <div 
        class="management-item"
        @click="toggleStageModal"
      >
        <div class="management-item__text">
          <p>Перевести на следующий этап</p>
        </div>
        <div>
          <!-- hint -->
        </div>
        <div 
          class="management-item__modal"
          v-if="isStageModalOpen"
          v-clickOutside="toggleStageModal"
          @click.stop
        >
          <div class="you-sure">
            <p>Вы уверены?</p>
          </div>
          <div class="buttons-block">
            <DefaultButton
              class="default-button__size--large default-button__color-gray"
              @click="toggleStageModal"
            >
              Отменить
            </DefaultButton>
            <DefaultButton
              class="default-button__size--large default-button__color-green"
              @click="moveNextStage"
            >
              Перевести
            </DefaultButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.applicant-management__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 16px;
}

.applicant-management__content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.management-item {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  background: color.$colorBackgroundSecondary;
  border-radius: 16px;
  transition: background-color transition.$medium;
  cursor: pointer;
}

.management-item__text {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.management-item:hover {
  background: color.$colorBackgroundSecondary_Hover;
}

.management-item__modal {
  position: absolute;
  top: 60px;
  width: 100%;
  padding: 16px;
  background: color.$colorTextWhite;
  border: 0.5px solid #DDE0E8;
  border-radius: 16px;
  box-shadow: 0px 15px 36.8px 0px #00000026;
}

.day-input {
  margin-bottom: 16px;
}

.you-sure {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 16px;
}

.buttons-block {
  display: flex;
  gap: 8px;
}
</style>