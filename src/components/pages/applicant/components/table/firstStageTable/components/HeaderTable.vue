<script lang="ts" setup>

</script>

<template>
  <div class="table-header">
    <div class="table-header__big-cell expert-cell">
      <p>Эксперт</p>
    </div>
    <div class="table-header__double-cell">
      <div class="stages">
        <div class="stages__stage">
          <p>Контент и мотивация</p>
        </div>
        <div class="stages__stage">
          <p>Структура и логика</p>
        </div>
      </div>
    </div>
    <div class="table-header__big-cell summary-cell">
      <p>Цели и связь с программой</p>
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

.stages__stage:first-child {
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