<script lang="ts" setup>

</script>

<template>
  <div class="table-header">
    <div class="table-header__item">
      <div>
        <p>ФИО</p>
      </div>
    </div>
    <div class="table-header__item">
      <div>
        <p>Номер телефона</p>
      </div>
    </div>
    <div class="table-header__item">
      <div>
        <p>Почта</p>
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
  flex: 1;
}

.empty-item {
  border-right: none
}
</style>