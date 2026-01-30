<script lang="ts" setup>

// цвет от количества экспертов
type Interview = {
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

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.column-item {
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
</style>