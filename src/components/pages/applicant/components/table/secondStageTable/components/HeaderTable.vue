<script lang="ts" setup>
import { useCompanyStore } from '@/store/company/companyStore';
import { computed } from 'vue';

const companyStore = useCompanyStore();

const isRosbioteh = computed(() => {
  return companyStore.selectedCompany === "Rosbioteh";
})
</script>

<template>
  <div 
    class="table-header"
    :class="{'table-header--high' : isRosbioteh}"
  >
    <div class="table-header__big-cell expert-cell">
      <p>Эксперт</p>
    </div>
    <div class="table-header__double-cell">
      <!-- <div class="title">
        <div>
          <p>Баллы по критериям</p>
        </div>
      </div> -->
      <div class="stages">
        <div class="stages__stage">
          <p>{{ isRosbioteh ? "Стремление решение бизнес-задачи и продуктовый подход" : "Целостность решения"}}</p>
        </div>
        <div class="stages__stage">
          <p>{{ isRosbioteh ? "Соответствие решения ценностям ВкусВилла" : "Аргументация предложенного решения"}}</p>
        </div>
        <div class="stages__stage">
          <p>{{ isRosbioteh ? "Технологическая состоятельность и грамотность решения" : "Реалистичность и здравый смысл"}}</p>
        </div>
      </div>
    </div>
    <div class="table-header__big-cell summary-cell">
      <p>{{ isRosbioteh ? "Нестандартность мышления и креативность в решении бизнес-задачи" : "Оригинальность подхода"}}</p>
    </div>
    <div class="table-header__big-cell comment-cell">
      <p>Комментарий</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.table-header {
  display: flex;
  border: 1px solid #DDE0E8;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: color.$colorBackgroundSecondary;
  height: 88px;
}

.table-header--high {
  height: 120px;
}

.summary-cell {
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  flex: 106;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.table-header__double-cell {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #DDE0E8;
  flex: 298;
}

.title {
  padding: 12px;
  flex: 1;
  border-bottom: 1px solid #DDE0E8;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.stages {
  display: flex;
  flex: 1;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.stages__stage {
  display: flex;
  padding: 12px;
  flex: 1;
}

.stages__stage:nth-child(1) {
  border-right: 1px solid #DDE0E8;
}

.stages__stage:nth-child(2) {
  border-right: 1px solid #DDE0E8;
}

.comment-cell {
  display: flex;
  flex: 423;
  padding: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.expert-cell {
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  flex: 254;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}
</style>