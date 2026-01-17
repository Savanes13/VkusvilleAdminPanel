<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '../../shared/elements/WrapperBlock.vue';
import StageElement from './components/StageElement.vue';
import { getDashboard } from '@/api/pages/dashboard/apiDashboard';
import type { IDashboardData } from '@/types/pages/dashboard/typesDashboard';
import { ref } from 'vue';

const padeDataArr = ref<null | IDashboardData>(null);

const getPageData = async () => {
  try {
    const response = await getDashboard();
    padeDataArr.value = response;
  } catch (error) {
    console.error("ошибка при получении данных страницы дашборд")
  }
}
getPageData();
</script>

<template>
  <div 
    class="dashboard"
    v-if="padeDataArr"
  >
    <PageHeader>
      Дашборд
    </PageHeader>
    <div class="dashboard__second-section">
      <WrapperBlock class="stages-charts">
        <div class="stages-charts__title">
          <p>Конверсия движения абитуриентов</p>
        </div>
        <div class="stages-charts__elements">
          <StageElement
            v-for="(item, index) in padeDataArr.charts"
            class="graf-elem"
            :title = "item.titleKey"
            :totalParticipants="item.totalParticipants"
            :passedCount="item.passedCount"
            :noPassedCount="item.noPassedCount"
            :key='`${index} + ${item.titleKey}`'
          />
        </div>
      </WrapperBlock>
    </div>
    <div class="dashboard__first-section">
      <WrapperBlock class="number-registrations">
        <div class="number-registrations__name">
          <p>Всего регистраций</p>
        </div>
        <div class="number-registrations__value">
          <div>
            <p>{{ padeDataArr.totalRegistrations.all }}</p>
          </div>
          <div class="registrations-weak">
            <p><span>+{{ padeDataArr.totalRegistrations.forWeek }}</span> за неделю</p>
          </div>
        </div>
      </WrapperBlock>
      <WrapperBlock class="average-score">
        <div class="average-score__header">
          <div>
            <p>Cредний балл</p>
          </div>
          <div>
            <!-- подсказка -->
          </div>
        </div>
        <div class="average-score__info">
          <div 
            class="border-wrap"
            v-for="item in padeDataArr.averageScore"
            :key="item.id"
          >
            <div class="border-wrap__name">
              <p>{{ item.id }} этап</p>
            </div>
            <div class="border-wrap__value">
              <p>{{ item.current }}<span> / {{ item.max }}</span></p>
            </div>
          </div>
        </div>
      </WrapperBlock> 
    </div>
    <div class="dashboard__third-section">
      <WrapperBlock class="deadline-tasks">
        <div class="deadline-tasks__title">
          <p>Горящие задачи</p>
        </div>
        <div class="deadline-tasks__content">
          <div class="deadline-item border-wrap">
            <div class="deadline-item__name">
              <p>Абитуриенты, пропустившие дедлайн</p>
            </div>
            <div class="deadline-item__value">
              <p>{{ padeDataArr.deadlineTasks.applicants }}</p>
            </div>
          </div>
          <div class="deadline-item border-wrap">
            <div class="deadline-item__name">
              <p>Зависшие эксперты</p>
            </div>
            <div class="deadline-item__value">
              <p>{{ padeDataArr.deadlineTasks.experts }}</p>
            </div>
          </div>
        </div>
      </WrapperBlock>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.dashboard__first-section {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.number-registrations {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 51px;
  flex-basis: 20%;
}

.number-registrations__name {
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: color.$colorTextPrimary;
}

.number-registrations__value {
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
  color: color.$colorTextPrimary;
}

.registrations-weak {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
  margin-top: 4px
}

.registrations-weak span {
  color: color.$colorTextAcccent;
}

.average-score {
  flex-basis: 80%;
}

.border-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
  border: 1px solid #D0D7E5;
  border-radius: 16px;
}

.border-wrap__name {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #333333;
}

.border-wrap__value {
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
  color: #333333;
}

.border-wrap__value span {
  color: color.$colorTextTertiary
}

.average-score__header {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: #333333;
}

.average-score__info {
  display: flex;
  gap: 16px;
}

.stages-charts {
  margin-bottom: 24px;
}

.stages-charts__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: color.$colorTextPrimary;
  margin-bottom: 24px;
}

.stages-charts__elements {
  display: flex;
  gap: 24px;
}

.graf-elem {
  flex: 1;
}

.deadline-tasks__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: color.$colorTextPrimary;
  margin-bottom: 24px;
}

.deadline-tasks__content {
  display: flex;
  gap: 16px;
}

.deadline-item__name {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.deadline-item__value {
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  color: color.$colorTextPrimary;
}
</style>