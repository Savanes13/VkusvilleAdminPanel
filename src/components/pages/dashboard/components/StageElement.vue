<script lang="ts" setup>
interface IStageElementProps {
  full: number; 
  current: number; 
  title: string;
  totalpParticipants: number;
  passed: number;
  noPassed: number;
}

const {
  full,
  current,
  title,
  totalpParticipants,
  passed,
  noPassed
} = defineProps<IStageElementProps>();
</script>

<template>
  <div class="stage-element">

    <div class="stage-element__grapf">
      <div 
        class="bar-total" 
        :style="{ height: full + 'px' }"
      ></div>
      <div 
        class="bar-current" 
        :style="{ height: current + 'px' }"
      ></div>
    </div>

    <div class="stage-element__percent">
      <div class="percent-elem">
        <p>{{ current }} %</p>
      </div>
      <div class="title-elem">
        <p>{{ title }}</p>
      </div>
    </div>
    <div class="stage-element__info">
      <div class="info-item">
        <div class="info-item__title">
          <p>Всего</p>
        </div>
        <div class="info-item__value item-black">
          <p>{{ totalpParticipants }}</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item__title">
          <p>Прошли</p>
        </div>
        <div class="info-item__value item-green">
          <p>{{ passed }}</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item__title">
          <p>Не прошли</p>
        </div>
        <div class="info-item__value item-red">
          <p>{{ noPassed }}</p>
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
}

.bar-total {
  position: absolute;
  bottom: 0;
  width: 100%;
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
