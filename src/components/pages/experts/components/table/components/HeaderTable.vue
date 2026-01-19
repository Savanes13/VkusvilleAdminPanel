<script lang="ts" setup>

</script>

<template>
  <div class="table-header">
    <div class="table-header__big-cell fio-cell">
      <p>ФИО</p>
    </div>

    <div class="table-header__double-cell">
      <div class="title">
        <div>
          <p>Непровереннные работы</p>
        </div>
        <div>
          <!-- подсказка -->
        </div>
      </div>
      <div class="stages">
        <div class="stages__stage">
          <p>1 этап</p>
        </div>
        <div class="stages__stage">
          <p>2 этап</p>
        </div>
      </div>
    </div>

    <div class="table-header__double-cell">
      <div class="title">
        <div>
          <p>Просроченные проверки</p>
        </div>
        <div>
          <!-- подсказка -->
        </div>
      </div>
      <div class="stages">
        <div class="stages__stage">
          <p>1 этап</p>
        </div>
        <div class="stages__stage">
          <p>2 этап</p>
        </div>
      </div>
    </div>

    <div class="table-header__double-cell">
      <div class="title">
        <div>
          <p>На грани дедлайна</p>
        </div>
        <div>
          <!-- подсказка -->
        </div>
      </div>
      <div class="stages">
        <div class="stages__stage">
          <p>1 этап</p>
        </div>
        <div class="stages__stage">
          <p>2 этап</p>
        </div>
      </div>
    </div>

    <div class="table-header__big-cell auth-cell">
      <p>Авторизован</p>
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

.fio-cell {
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  flex: 24;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.table-header__double-cell {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #DDE0E8;
  flex: 24;
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
  justify-content: end;
  flex: 1;
}

.stages__stage:first-child {
  border-right: 1px solid #DDE0E8;
}

.auth-cell {
  display: flex;
  justify-content: end;
  flex: 13;
  padding: 12px 21px 12px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}
</style>