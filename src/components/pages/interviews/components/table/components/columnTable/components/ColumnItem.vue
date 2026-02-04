<script lang="ts" setup>
import { getExpertsForId } from '@/api/pages/Interviews/apiInterviews';
import { mainIcons } from '@/components/shared/icons/mainIcons';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

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
  data: DayInterviews ;
  time: number;
  firstLine: boolean;
  columnIndex: number;
}

const {
  data,
  time,
  firstLine,
  columnIndex
} = defineProps<IColumnItemProps>();

const emit = defineEmits<{
  (e: 'openAddWindow', id: number, experts: number[]): void
}>();

const isVisibleHideBlock = ref<boolean>(false);
const expertDataArr = ref<null | IExpert[]>(null);
const hideBlockRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const localTime = computed(() => time + 8);
const localTimePlus = computed(() => time + 9);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const times = computed(() =>
  data.interviews.map(interview => {
    const date = new Date(interview.start_time);
    return Number(
      date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Moscow",
      }).split(":")[0]
    );
  })
);

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

const requiredItem = computed(() => {
  return data.interviews.find(item => {
    return timestampToNumber(item.start_time) === localTime.value;
  });
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
  if (isVisibleHideBlock.value && requiredItem.value?.reviewer_ids) {
    getExpertForHimId(requiredItem.value.reviewer_ids);
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
  if (!requiredItem.value?.id) return;
  emit('openAddWindow', requiredItem.value.id, requiredItem.value.reviewer_ids);
}

const contentClass = computed(() => {
  const reviewersLength = requiredItem.value?.reviewer_ids?.length ?? 0;
  return {
    'column-item__content--green': reviewersLength >= 2,
    'column-item__content--yellow': reviewersLength === 1,
    'column-item__content--red': reviewersLength === 0
  };
});
</script>

<template>
  <div 
    class="column-item"
    :class="{'column-item--border-top' : firstLine}"
  >
    <div 
      class="column-item__content"
      :class="contentClass"
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
      :class="{'column-item__hide-block--left' : columnIndex === 3 || columnIndex === 4}"
      v-if="isVisibleHideBlock && requiredItem"
      ref="hideBlockRef"
    >
      <div class="hide-date">
        <div class="hide-date__title">
          <p>Время и дата</p>
        </div>
        <div class="hide-date__text">
          <p>Понедельник, 17 ноября, 
            <span v-if="localTime === 8">0{{ localTime }}:00 – 0{{ localTimePlus }}:00</span>
            <span v-if="localTime === 9">0{{ localTime }}:00 – {{ localTimePlus }}:00</span>
            <span v-if="localTime > 9">{{ localTime }}:00 – {{ localTimePlus }}:00</span>
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
            <div>
              <p>{{ expert.display_name }}</p>
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

.column-item--border-top {
  border-top: 1px solid #DDE0E8;
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
}

.experts {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}

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

.column-item__hide-block--left {
  left: auto; 
  right: 100%;
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

.experts-block__title {
  color: color.$colorTextSecondary;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  margin-bottom: 2px;
}
</style>