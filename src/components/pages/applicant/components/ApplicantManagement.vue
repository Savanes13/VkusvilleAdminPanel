<script lang="ts" setup>
import { giveMoreDaysForWork, moveToNextStage } from '@/api/pages/applicant/apiApplicant';
import HintItem from '@/components/shared/elements/HintItem.vue';
import { mainIcons } from '@/components/shared/icons/mainIcons';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import { useUserStore } from '@/store/user/userStore';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface IErrorNextStage {
  show: boolean
  text: string
}

interface ITheseChanges {
  show: boolean
  text: string
}

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
const userStore = useUserStore();
const errorNextStage = ref<IErrorNextStage>({
  show: false,
  text: ''
})
const theseChanges = ref<ITheseChanges>({
  show: false,
  text: ''
})
let hideTimeout: number | null = null;

onUnmounted(() => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
});

watch(() => dayInputObj.value, () => {
  dayInputObj.error.show = false;
});

watch(() => isStageModalOpen.value, () => {
  errorNextStage.value.show = false;
});

const toggleDayModal = () => {
  isDayModalOpen.value = !isDayModalOpen.value;
};

const toggleStageModal = () => {
  isStageModalOpen.value = !isStageModalOpen.value;
};

const closeTheseСhangesBlock = () => {
  theseChanges.value.show = false;
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
}

const onlyDigits = (): boolean => {
  return /^\d+$/.test(dayInputObj.value);
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
    if (!onlyDigits()) {
      dayInputObj.error.show = true;
      dayInputObj.error.text = "вводите только цифры"
      return;
    };
    await giveMoreDaysForWork(Number(applicantId), daysToSeconds());
    theseChanges.value.show = true;
    theseChanges.value.text = 'Абитуриенту дано дополнительное время на выполнение задания';
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      theseChanges.value.show = false;
    }, 4000);
  } catch (error: any) {
    if(error.message) {
      dayInputObj.error.show = true;
      dayInputObj.error.text = error.message
    } else {
      dayInputObj.error.show = true;
      dayInputObj.error.text = 'ошибка при предоставлении доп времени'
    }
  }
}

const moveNextStage = async () => {
  try {
    if (!applicantId) return
    await moveToNextStage(Number(applicantId));
    theseChanges.value.show = true;
    theseChanges.value.text = 'Абитуриент переведён на следующий этап';
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      theseChanges.value.show = false;
    }, 4000);
  } catch (error: any) {
    if(error.message) {
      errorNextStage.value.show = true;
      errorNextStage.value.text = error.message
    } else {
      errorNextStage.value.show = true;
      errorNextStage.value.text = 'ошибка при переводе на следущий этап'
    }
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
        :class="{'management-item--disabled' : userStore.role === 'GUEST'}"
        @click="toggleDayModal"
      >
        <div class="management-item__text">
          <p>Дать дополнительное время</p>
        </div>
        <div>
          <HintItem
            text="Позволяет продлить дедлайн для этапа. Абитуриент сможет отправить задание после первоначального срока"
            :width="270"
            :height="100"
            position="bottom-right"
          />
        </div>
        <transition name="fadeFast">
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
              :number-type="true"
            />  
            <DefaultButton
              class="default-button__size--large default-button__color-green"
              @click="giveMoreDays"
            >
              Выдать
            </DefaultButton>
          </div>
        </transition>
      </div>
      <div 
        class="management-item"
        :class="{'management-item--disabled' : userStore.role === 'GUEST'}"
        @click="toggleStageModal"
      >
        <div class="management-item__text">
          <p>Перевести на следующий этап</p>
        </div>
        <div>
          <HintItem
            text="Ручной перевод абитуриента на следующий этап вне зависимости от сроков и полученных баллов"
            :width="270"
            :height="80"
            position="bottom-right"
          />
        </div>
        <transition name="fadeFast">
          <div 
            class="management-item__modal"
            v-if="isStageModalOpen"
            v-clickOutside="toggleStageModal"
            @click.stop
          >
            <div class="you-sure">
              <p>Вы уверены?</p>
            </div>
            <transition :name="'fade-slide'" mode="out-in">
              <div 
                v-if="errorNextStage.show"
                class="error-stage"
              >
                <p>{{ errorNextStage.text }}</p>
              </div>
            </transition>
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
        </transition>
      </div>
    </div>
    <transition name="fadeFast">
      <div 
        class="success-block"
        v-if="theseChanges.show"
      >
        <div>
          <span
            v-html="mainIcons['checkCurcle']"
          ></span>
        </div>
        <div>
          <p>{{ theseChanges.text }}</p>
        </div>
        <div  
          @click="closeTheseСhangesBlock"
          class="success-block__close"
        > 
          <span
            v-html="mainIcons['closeGray']"
          ></span>
        </div>
      </div>
    </transition>
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
  gap: 8px;
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

.management-item--disabled {
  opacity: 0.64;
  pointer-events: none;
}

.management-item__modal {
  position: absolute;
  top: 55px;
  width: 100%;
  padding: 16px;
  background: color.$colorTextWhite;
  border: 0.5px solid #DDE0E8;
  border-radius: 16px;
  box-shadow: 0px 15px 36.8px 0px #00000026;
  z-index: 1;
}

.day-input {
  margin-bottom: 16px;
}

.you-sure {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.buttons-block {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.error-stage {
  color: #FF3347;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
}

.success-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 422px;
  position: fixed;
  padding: 16px;
  background: color.$colorBlack;
  border-radius: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextWhite;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.success-block__close {
  cursor: pointer;
}

/* Анимация появления/исчезновения ошибки */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity transition.$medium, transform transition.$medium, max-height transition.$medium;
  overflow: hidden;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-14px);
  max-height: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 100px;
}

@media (max-width: 950px) {
  .applicant-management__content {
    flex-direction: column;
  }
}

@media (max-width: 450px) {
  .success-block {
    width: 310px;
    font-size: 14px;
    line-height: 20px;
    bottom: 70px;
  }
}
</style>