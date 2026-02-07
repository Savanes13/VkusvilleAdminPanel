<script lang="ts" setup>
import { computed } from 'vue';

type DictKey = keyof typeof dict;

type Stage = "INIT" | "STAGE_1" | "STAGE_2" | "STAGE_3";

interface IStageElementProps {
  title: string;
  totalParticipants: number;
  passedCount: number;
  noPassedCount: number;
}

const {
  title,
  totalParticipants,
  passedCount,
  noPassedCount
} = defineProps<IStageElementProps>();

const percent = computed(() => {
  if (!totalParticipants) return 0;
  return Math.round(
    (passedCount / totalParticipants) * 100
  );
});

const dict = {
  INIT: "Вход в бота",
  STAGE_1: "1 этап. Эссе и кружок",
  STAGE_2: "2 этап. Кейс",
  STAGE_3: "3 этап. Собеседование"
};

const getValue = (key: DictKey) => {
  return dict[key];
}
</script>

<template>
  <div class="stage-element">
    <div class="stage-element__grapf">
      <div class="bar-total"></div>
      <div 
        class="bar-current" 
        :style="{ height: percent + '%' }"
      ></div>
    </div>
    <div class="stage-element__percent">
      <div class="percent-elem">
        <p>{{ percent }} %</p>
      </div>
      <div class="title-elem">
        <p>{{ getValue(title as Stage) }}</p>
      </div>
    </div>
    <div class="stage-element__info">
      <div class="info-item">
        <div class="info-item__title">
          <p>Всего</p>
        </div>
        <div class="info-item__value item-black">
          <p>{{ totalParticipants }}</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item__title">
          <p>Прошли</p>
        </div>
        <div class="info-item__value item-green">
          <p>{{ passedCount }}</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item__title">
          <p>Не прошли</p>
        </div>
        <div class="info-item__value item-red">
          <p>{{ noPassedCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.stage-element__grapf {
  position: relative;
  width: 100%;
  background: transparent;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 8px;
  height: 120px;
}

.bar-total {
  width: 100%;
  height: 100%;
  background-color: color.$colorBackgroundAccentAlternative;
  border-radius: 16px;
}

.bar-current {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(180deg, #2DBE64 33.31%, #93F0B6 100%);
  border-radius: 16px;
}

.stage-element__percent {
  border-bottom: 1px solid color.$colorSeparator;
}

.percent-elem {
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: color.$colorTextPrimary;
  margin-bottom: 4px;
}

.title-elem {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
}

.info-item__title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
}

.stage-element__info {
  margin-top: 8px;
}

.info-item__value {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.item-black {
  color: color.$colorTextPrimary;
}

.item-green {
  color: color.$colorTextAcccent;
}

.item-red {
  color: color.$colorTextNegative;
}
</style>
