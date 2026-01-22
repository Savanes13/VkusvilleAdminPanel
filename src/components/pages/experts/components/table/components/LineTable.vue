<script lang="ts" setup>
interface StageTask {
  stage_id: number;
  value: number;
}

interface ILineTableProps {
  display_name: string;
  level: number;
  is_auth: boolean;
  unreviewed_tasks: StageTask[];
  review_timeout_tasks: StageTask[];
  deadline_tasks: StageTask[];
  lastLine: boolean;
}

const {
  display_name,
  level,
  is_auth,
  unreviewed_tasks,
  review_timeout_tasks,
  deadline_tasks,
  lastLine = false
} = defineProps<ILineTableProps>();
</script>

<template>
  <div 
    class="line-table"
    :class="{'line-table--last' : lastLine}"
  >
    <div class="line-table__name">
      <p>{{ display_name }}</p>
    </div>
    <div class="line-table__item">
      <div class="quantity">
        <p>{{ unreviewed_tasks[0]?.value }}</p>
      </div>
      <div class="quantity">
        <p>{{ unreviewed_tasks[1]?.value }}</p>
      </div>
    </div>
    <div class="line-table__item">
      <div class="quantity">
        <p>{{ review_timeout_tasks[0]?.value }}</p>
      </div>
      <div class="quantity">
        <p>{{ review_timeout_tasks[1]?.value }}</p>
      </div>
    </div>
    <div class="line-table__item">
      <div 
        class="quantity"
        :class="{'quantity--red' : deadline_tasks[0]!.value > 0}"
      >
        <p>{{ deadline_tasks[0]?.value }}</p>
      </div>
      <div 
        class="quantity"
        :class="{'quantity--red' : deadline_tasks[0]!.value > 0}"
      >
        <p>{{ deadline_tasks[1]?.value }}</p>
      </div>
    </div>
    <div class="auth">
      <p 
        v-if="is_auth"
        class="auth__true"
      >Да</p>
      <p 
        v-else
        class="auth__false"
      >Нет</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.line-table {
  display: flex;
  border-bottom: 1px solid #DDE0E8;
  border-left: 1px solid #DDE0E8;
  border-right: 1px solid #DDE0E8;
  height: 72px;
}

.line-table--last {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.line-table__name {
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  flex: 24;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.line-table__item {
  display: flex;
  border-right: 1px solid #DDE0E8;
  flex: 24;
}

.quantity {
  padding: 24px 12px;
  display: flex;
  justify-content: end;
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.quantity--red {
  color: color.$colorTextNegative;
}

.quantity:first-child {
  border-right: 1px solid #DDE0E8;
}

.auth {
  padding: 24px 21px 24px 12px;
  flex: 13;
  font-family: Euclid Circular B;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.auth__true {
  color: color.$colorTextAcccent;
}

.auth__false {
  color: color.$colorTextNegative;
}
</style>