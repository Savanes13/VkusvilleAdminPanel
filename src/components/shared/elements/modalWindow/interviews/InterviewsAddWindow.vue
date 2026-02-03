<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import { getExpertsForInterview } from '@/api/pages/Interviews/apiInterviews';
import { ref } from 'vue';
import arrow from '@/assets/images/checkbox/arrow.svg'

interface IInterviewsAddWindowProps {
  id: number | null
  experts: number[] | null
}

const {
  id,
  experts
} = defineProps<IInterviewsAddWindowProps>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'changeExperts', id: number, arr: number[]): void;
}>();

const closeWindow = () => {
  emit("close");
};

type Reviewer = {
  id: number;
  display_name: string;
  level: number;
};

const arrExperts = ref<null | Reviewer[]>(null);
const selectedExperts = ref<number[]>([]);

const getAllExperts = async () => {
  try {
    const response = await getExpertsForInterview();
    arrExperts.value = response.items;

    if (experts) {
      selectedExperts.value = [...experts];
    }
  } catch (error) {
    console.error(error);
  }
};
getAllExperts();

const toggleExpert = (id: number) => {
  if (selectedExperts.value.includes(id)) {
    selectedExperts.value = selectedExperts.value.filter(x => x !== id);
  } else {
    selectedExperts.value.push(id);
  }
};

const setExperts = async () => {
  try {
    if (id === null || id === undefined) return;
    // for (const expertId of selectedExperts.value) {
    //   await addExpertToInterview(id, expertId);
    // }
    emit("changeExperts", id, selectedExperts.value)
    closeWindow();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <BackgroundModal :grey-mobile="true">
    <div 
      class="add-window"
      v-clickOutside="closeWindow"
    >
      <ModalWindow
        name="Добавление эксперта"
        @close="closeWindow"
        :have-mobile-type="true"
      > 

        <div class="title">
          <p>Выберите экспертов из списка, чтобы добавить их на собеседование</p>
        </div>

        <div 
          class="experts" 
          v-if="arrExperts"
        >

          <div 
            class="experts__item"
            v-for="item in arrExperts"
            :key="item.id"
          >
            <div 
              class="custom-checkbox" 
              :class="{ 'custom-checkbox--active': selectedExperts.includes(item.id) }"
              @click="toggleExpert(item.id)"
            >
              <img 
                v-if="selectedExperts.includes(item.id)" 
                :src="arrow"
                alt="галочка"
              />
            </div>
            <div>
              <p>{{ item.display_name }}</p>
            </div>
          </div>

        </div>

        <div class="buttons-block">
          <DefaultButton
            class="default-button__size--large default-button__color-gray"
            @click="closeWindow"
          >
            Отменить
          </DefaultButton>
          <DefaultButton
            class="default-button__size--large default-button__color-green"
            @click="setExperts"
          >
            Сохранить
          </DefaultButton>
        </div>

        
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.add-window {
  width: 438px;
}

.title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 24px;
}

.buttons-block {
  display: flex;
  gap: 16px;
}

.experts {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  
}

.experts__item {
  padding: 10px 0px;
  display: flex;
  gap: 10px;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid color.$colorIconTertiary;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s;
  position: relative;
}

.custom-checkbox--active {
  background-color: color.$colorStrokeAccent;
  border-color: color.$colorStrokeAccent;
}

.custom-checkbox img {
  width: 12px;
  height: 10px;
  pointer-events: none; // чтобы клик шёл на контейнер
  user-select: none;
}
</style>