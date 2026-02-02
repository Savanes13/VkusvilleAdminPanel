<script lang="ts" setup>
import InterviewsAddWindow from '@/components/shared/elements/modalWindow/interviews/InterviewsAddWindow.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import { ref } from 'vue';


// цвет от количества экспертов
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

const isVisibleHideBlock = ref<boolean>(false);
let localTime = time + 8;
let localTimePlus = time + 9;

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

const toggleHideBlock = () => {
  isVisibleHideBlock.value = !isVisibleHideBlock.value;

  // получать список экспертов

  // при закрытии очищать
};

</script>

<template>
  <div class="column-item">

    <!-- {{requiredItem  }} -->

    <!-- {{ times }} -->

    <!-- {{ time }} -->

    <!-- {{ localTime }} -->

    <div 
      class="column-item__content"
      :class="{
        'column-item__content--green' : requiredItem?.reviewer_ids.length >= 2,
        'column-item__content--yellow' : requiredItem?.reviewer_ids.length === 1,
        'column-item__content--red' : requiredItem?.reviewer_ids.length === 0
      }"
      v-if="times.includes(localTime)"
      @click="toggleHideBlock"
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
      v-clickOutside="toggleHideBlock"
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

        </div>
      </div>
      <DefaultButton
        class="default-button__size--large default-button__color-gray"
        left-icon="plusBlack"
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
  color: color.$colorTextSecondary;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  gap: 2px;
}

.experts-block__title {
  margin-bottom: 2px;
}
</style>