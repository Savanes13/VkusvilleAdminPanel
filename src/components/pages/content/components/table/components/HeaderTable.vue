<script lang="ts" setup>

</script>

<template>
  <div class="table-header">
    <div class="table-header__item text-item">
      <div>
        <p>Текст</p>
      </div>
      <div>
        <!-- подсказка -->
      </div>
    </div>
    <div class="table-header__item key-item">
      <div>
        <p>Ключ</p>
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
  padding-left: 12px;
  border-right: 1px solid #DDE0E8;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.text-item {
  flex: 560;
}

.key-item {
  flex: 330;
}

.empty-item {
  flex: 190;
  border-right: none
}
</style>