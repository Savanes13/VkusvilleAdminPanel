<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '../../shared/elements/WrapperBlock.vue';
import StageElement from './components/StageElement.vue';
</script>

<template>
  <div class="dashboard">
    <PageHeader>
      Дашборд
    </PageHeader>

    <div class="dashboard__second-section">
      <WrapperBlock class="stages-charts">
        <StageElement
          :full = "100"
          :current = "47"
          title = "1 этап. Название этапа"
          :totalpParticipants = "65967"
          :passed = "15967"
          :noPassed = "35563"
        />

        <StageElement
          :full = "100"
          :current = "47"
          title = "1 этап. Название этапа"
          :totalpParticipants = "65967"
          :passed = "15967"
          :noPassed = "35563"
        />
      </WrapperBlock>
    </div>

    <!-- <div>
      <StageElement
        :full = "100"
        :current = "47"
        title = "1 этап. Название этапа"
        :totalpParticipants = "65967"
        :passed = "15967"
        :noPassed = "35563"
      />
    </div> -->


    <div class="dashboard__first-section">
      <WrapperBlock class="number-registrations">
        <div class="number-registrations__name">
          <p>Общее количество регистраций</p>
        </div>
        <div class="number-registrations__value">
          <p>100 000</p>
        </div>
      </WrapperBlock>
      <WrapperBlock class="average-score">
        <div class="average-score__header">
          <div>
            <p>Cредний балл</p>
          </div>
          <div>

          </div>
        </div>
        <div class="average-score__info">
          <div class="border-wrap">
            <div class="border-wrap__name">
              <p>1 этап</p>
            </div>
            <div class="border-wrap__value">
              <p>1,001 балла</p>
            </div>
          </div>
          <div class="border-wrap">
            <div class="border-wrap__name">
              <p>2 этап</p>
            </div>
            <div class="border-wrap__value">
              <p>2,5 балла</p>
            </div>
          </div>
          <div class="border-wrap">
            <div class="border-wrap__name">
              <p>3 этап</p>
            </div>
            <div class="border-wrap__value">
              <p>4,31 балла</p>
            </div>
          </div>
        </div>
      </WrapperBlock> 
    </div>

  </div>
</template>

<style lang="scss" scoped>
.dashboard__first-section {
  display: flex;
  gap: 24px;
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
  color: #333333;
}

.number-registrations__value {
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
  color: #333333;
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
  display: flex;
  gap: 24px;
  align-items: flex-end; // чтобы StageElement растягивался вниз
  height: 300px; // фиксированная высота для контейнера
}
</style>