<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import { addExpertToInterview, getExpertsForInterview } from '@/api/pages/Interviews/apiInterviews';
import { ref } from 'vue';
import CheckMark from '@/components/shared/ui/checkbox/CheckMark.vue';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'changeText', value: string): void;
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

const getAllExperts = async () => {
  try {
    const response = await getExpertsForInterview();
    arrExperts.value = response.items
  } catch (error) {

  }
}
getAllExperts();

// const setExpert = async () => {
//   try {
//     const response = await addExpertToInterview(1, 1);
//   } catch (error) {

//   }
// }
// setExpert()
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
            v-for="(item, index) in arrExperts"
          >
            <!-- <CheckMark

            /> -->
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
  margin-bottom: 24px;
}

.experts__item {
  display: flex;
  gap: 10px;
}
</style>