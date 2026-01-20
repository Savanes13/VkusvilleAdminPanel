<script lang="ts" setup>

</script>

<template>
  <div class="table-header">
    <div class="table-header__item fio-item">
      <div>
        <p>ФИО</p>
      </div>
      <div>
        <!-- подсказка -->
      </div>
    </div>
    <div class="table-header__item tg-item">
      <div>
        <p>Телеграм-ID</p>
      </div>
      <div>
        <!-- подсказка -->
      </div>
    </div>
    <div class="table-header__item stage-item">
      <div>
        <p>Этап</p>
      </div>
      <div>
        <!-- подсказка -->
      </div>
    </div>
    <div class="table-header__item amount-item">
      <div>
        <p>Сумма баллов</p>
      </div>
      <div>
        <!-- подсказка -->
      </div>
    </div>
    <div class="table-header__item dedline-item">
      <div>
        <p>Дедлайн</p>
      </div>
      <div>
        <!-- подсказка -->
      </div>
    </div>
    <div class="table-header__item empty-item">
      
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
}

.table-header__item {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.fio-item {
  flex: 340;
}

.tg-item {
  flex: 165;
}

.stage-item {
  flex: 80;
}

.amount-item {
  flex: 165;
}

.dedline-item {
  flex: 165;
}

.empty-item {
  flex: 165;
  border-right: none
}
</style>