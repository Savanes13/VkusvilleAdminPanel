<script lang="ts" setup>
import BackgroundModal from '@/components/layout/background/BackgroundModal.vue';
import ModalWindow from '../../ModalWindow.vue';
import { computed, ref } from 'vue';
import { getExpertsForId } from '@/api/pages/Interviews/apiInterviews';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';

interface IExpert {
  display_name: string
  id: number
  level: number
}

interface IDataInterviewWindow {
  id: number | null;
  experts: number[] | null;
  day: string | null;
  data: number | null;
  month: string | null;
  time: number | null;
}

interface IDataInterviewWindowProps {
  data: IDataInterviewWindow
}

const {
  data
} = defineProps<IDataInterviewWindowProps>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'openAddWindow', id:number, experts: number[]): void;
}>();

const closeWindow = () => {
  emit("close");
};

const expertDataArr = ref<null | IExpert[]>(null);
const localTimePlus = computed(() => (data.time ?? 0) + 1);

const getExpertForHimId = async (arr: number[]) => {
  try {
    expertDataArr.value = null;
    const promises = arr.map(id => getExpertsForId(id));
    const results = await Promise.all(promises);
    expertDataArr.value = results.flat()
  } catch (error) {
    console.error('ошибка при получении данных эксперта')
  }
}

if (data.experts && data.experts.length > 0) {
  getExpertForHimId(data.experts);
}

const openAddExpertWindow = () => {
  if (!data.id || !data.experts) return;
  emit('openAddWindow', data.id, data.experts)
  closeWindow();
}
</script>

<template>
  <BackgroundModal :grey-mobile="true">
    <div 
      class="data-window"
      v-clickOutside="closeWindow"
    >
      <ModalWindow
        name="Собеседование"
        @close="closeWindow"
        :have-mobile-type="true"
      > 
        <div class="hide-date">
          <div class="hide-date__title">
            <p>Время и дата</p>
          </div>
          <div class="hide-date__text">
            <p>{{ data.day }}, {{ data.data }} {{ data.month }}, 
              <span v-if="data.time === 8">0{{ data.time }}:00 – 0{{ localTimePlus }}:00</span>
              <span v-if="data.time === 9">0{{ data.time }}:00 – {{ localTimePlus }}:00</span>
              <span v-if="(data.time ?? 0) > 9">{{ data.time }}:00 – {{ localTimePlus }}:00</span>
            </p>
          </div>
        </div>
        <div class="experts-block">
          <div class="experts-block__title">
            <p>Будут присутствовать</p>
          </div>
          <div class="experts-block__items">
            <div 
              class="expert-item"
              v-for="expert in expertDataArr"
            >
              <div v-if="expertDataArr?.length">
                <p>{{ expert.display_name }}</p>
              </div>
            </div>
            <div v-if="!expertDataArr?.length">
              <p>Нет экспертов</p>
            </div>
          </div>
        </div>
        <DefaultButton
          class="default-button__size--large default-button__color-gray"
          left-icon="plusBlack"
          @click="openAddExpertWindow"
          >
          Добавить эксперта
        </DefaultButton>
      </ModalWindow>
    </div>
  </BackgroundModal>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.data-window {
  width: 400px;
}

.hide-date {
  margin-bottom: 16px;
}

.hide-date__title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
  margin-bottom: 2px;
}

.hide-date__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.experts-block {
  margin-bottom: 16px;
}

.experts-block__title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
  margin-bottom: 2px;
}

.experts-block__items {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}
</style>