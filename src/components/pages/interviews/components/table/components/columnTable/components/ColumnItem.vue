<script lang="ts" setup>
import { getExpertsForId } from '@/api/pages/Interviews/apiInterviews';
import { mainIcons } from '@/components/shared/icons/mainIcons';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

interface IExpert {
  display_name: string
  id: number
  level: number
}

type Interview = {
  id: number;
  start_time: number;
  reviewer_ids: number[];
};

type DayInterviews = {
  day: number;
  interviews: Interview[];
};

interface IColumnItemProps {
  data: DayInterviews
  time: number
}

const {
  data,
  time
} = defineProps<IColumnItemProps>();

const emit = defineEmits<{
  (e: 'openAddWindow', id: number, experts: number[]): void
}>();

const isVisibleHideBlock = ref<boolean>(false);
const expertDataArr = ref<null | IExpert[]>(null);
const hideBlockRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
let localTime = time + 8;
let localTimePlus = time + 9;

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const times = data.interviews.map(interview => {
  const date = new Date(interview.start_time);
  return Number(
    date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Moscow",
    }).split(":")[0]
  );
});

const timestampToNumber = (date: number) => {
  const newDate = new Date(date);
  return Number(
    newDate.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Moscow",
    }).split(":")[0]
  );
}

const requiredItem = data.interviews.find((item) => {
  const toNumber = timestampToNumber(item.start_time);
  return localTime === toNumber;
});

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  // если клик вне pop-up и вне контента
  if (hideBlockRef.value && contentRef.value && !hideBlockRef.value.contains(target) && !contentRef.value.contains(target)) {
    isVisibleHideBlock.value = false;
  }
};

const toggleHideBlock = () => {
  isVisibleHideBlock.value = !isVisibleHideBlock.value;
  if (isVisibleHideBlock.value && requiredItem?.reviewer_ids) {
    getExpertForHimId(requiredItem.reviewer_ids);
  }
};

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

const openAddExpertWindow = () => {
  if (!requiredItem?.id) return
  emit('openAddWindow', requiredItem?.id, requiredItem?.reviewer_ids)
}

const deleteExpert = async () => {
  // тут навенрн эмит
  // try {

  // } catch (error) {

  // }
}
</script>

<template>
  <div class="column-item">

    <div 
      class="column-item__content"
      :class="{
        'column-item__content--green' : requiredItem?.reviewer_ids.length >= 2,
        'column-item__content--yellow' : requiredItem?.reviewer_ids.length === 1,
        'column-item__content--red' : requiredItem?.reviewer_ids.length === 0
      }"
      v-if="times.includes(localTime)"
      @click="toggleHideBlock"
      ref="contentRef"
    >
      <div class="time">
        <p v-if="localTime === 8">0{{ localTime }}:00 – 0{{ localTimePlus }}:00</p>
        <p v-if="localTime === 9">0{{ localTime }}:00 – {{ localTimePlus }}:00</p>
        <p v-if="localTime > 9">{{ localTime }}:00 – {{ localTimePlus }}:00</p>
      </div>
      <div class="experts">
        <p>{{ requiredItem?.reviewer_ids.length }} экспертов</p>
      </div>
    </div>

    <div 
      class="column-item__hide-block"
      v-if="isVisibleHideBlock && requiredItem"
      ref="hideBlockRef"
    >
      <div class="hide-date">
        <div class="hide-date__title">
          <p>Время и дата</p>
        </div>
        <div class="hide-date__text">
          <p>Понедельник, 17 ноября, 09:00–10:00</p>
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
            <div>
              <p>{{ expert.display_name }}</p>
            </div>
            <div class="expert-item__delete">
              <span
                v-html="mainIcons['closeGray']"
              ></span>
            </div>
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
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.column-item {
  position: relative;
  height: 62px;
  padding: 4px;
  border-bottom: 1px solid #DDE0E8;
  border-left: 1px solid #DDE0E8;
  cursor: pointer;
}

.column-item__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 8px 8px 0px 8px;
}

.column-item__content--green {
  background: color.$colorBackgroundAccentAlternative;
  color: color.$colorTextAcccent;
}

.column-item__content--yellow {
  background: color.$colorBackgroundWarning;
  color: #A15F01;
}

.column-item__content--red {
  background: color.$colorBackgroundNegativeTint;
  color: color.$colorTextNegative;
}

.time {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  // color: color.$colorIconPrimary;
}

.experts {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  // color: color.$colorIconPrimary;
}

// делать только border-bottom

.column-item__hide-block {
  width: 330px;

  position: absolute;
  top: -50%;
  left: 100%; 
  background: color.$colorTextWhite;
  padding: 16px;
  box-shadow: 0px 15px 36.8px 0px #00000026;
  border-radius: 20px;
  z-index: 10;
}

.hide-date {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 12px;
}

.hide-date__title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
}

.hide-date__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.experts-block {
  gap: 2px;
  margin-bottom: 12px;
}

.expert-item {
  display: flex;
  gap: 2px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.expert-item:hover .expert-item__delete {
  opacity: 1;
}

.expert-item__delete {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.experts-block__title {
  color: color.$colorTextSecondary;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  margin-bottom: 2px;
}
</style>