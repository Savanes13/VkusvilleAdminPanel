<script lang="ts" setup>
  
</script>

<template>
  <div class="applicant-management">
    <div class="applicant-management__title">
      <p>Управление</p>
    </div>
    <div class="applicant-management__content">
      <div class="management-item">
        <div>
          <p>Дать дополнительное время</p>
        </div>
        <div>
          <!-- hint -->
        </div>
      </div>
      <div class="management-item">
        <div>
          <p>Перевести на следующий этап</p>
        </div>
        <div>
          <!-- hint -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.applicant-management__title {
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: color.$colorTextPrimary;
  margin-bottom: 16px;
}

.applicant-management__content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.management-item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: color.$colorTextPrimary;
  background: color.$colorBackgroundSecondary;
  border-radius: 16px;
  transition: background-color transition.$medium;
  cursor: pointer;
}

.management-item:hover {
  background: color.$colorBackgroundSecondary_Hover;
}
</style>