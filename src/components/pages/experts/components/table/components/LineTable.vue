<script lang="ts" setup>
type IExpertStats = {
  first: number;
  second: number;
};

interface ILineTableProps {
  id: number;
  name: string;
  isAuth: boolean;
  untested: IExpertStats;
  overdue: IExpertStats;
  deadline: IExpertStats;
};

const {
  id,
  name,
  isAuth,
  untested,
  overdue,
  deadline
} = defineProps<ILineTableProps>();
</script>

<template>
  <div class="line-table">
    <div class="line-table__name">
      <p>{{ name }}</p>
    </div>
    <div class="line-table__item">
      <div class="quantity">
        <p>{{ untested.first }}</p>
      </div>
      <div class="quantity">
        <p>{{ untested.second }}</p>
      </div>
    </div>
    <div class="line-table__item">
      <div class="quantity">
        <p>{{ overdue.first }}</p>
      </div>
      <div class="quantity">
        <p>{{ overdue.second }}</p>
      </div>
    </div>
    <div class="line-table__item">
      <div 
        class="quantity"
        :class="{'quantity--red' : deadline.first > 0}"
      >
        <p>{{ deadline.first }}</p>
      </div>
      <div 
        class="quantity"
        :class="{'quantity--red' : deadline.second > 0}"
      >
        <p>{{ deadline.second }}</p>
      </div>
    </div>
    <div class="auth">
      <p 
        v-if="isAuth"
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