<script lang="ts" setup>
import ContentWindow from '@/components/shared/elements/modalWindow/content/ContentWindow.vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';
import { ref } from 'vue';

interface ILineTableProps {
  id: number;
  fio: string;
  telegram_id: string;
  stage: number;
  scores: number;
  deadline: boolean;
  lastLine: boolean;
  empty?: boolean;
}

const {
  id,
  fio,
  telegram_id,
  stage,
  scores,
  deadline,
  lastLine = false,
  empty
} = defineProps<ILineTableProps>();
</script>

<template>
  <div 
    class="line-table"
    :class="{'line-table--last' : lastLine}"
  >
    <div class="line-table__item fio-item">
      <p>{{ fio }}</p>
    </div>
    <div class="line-table__item tg-item">
      <p>{{ telegram_id}}</p>
    </div>
    <div class="line-table__item stage-item">
      <p v-if="!empty">{{ stage}}</p>
    </div>
    <div class="line-table__item amount-item">
      <p v-if="!empty">{{ scores}}</p>
    </div>
    <div 
      class="line-table__item dedline-item"
      :class="{'dedline-item--overdue' : deadline}"
    >
      <p v-if="!empty">{{ !deadline ? "Соблюден" : "Просрочен" }}</p>
    </div>
    <div class="line-table__item empty-item">
      <router-link :to="`/applicant/${id}`">
        <IconButton
          class="button-icon__color-green-transparent"
          icon="eye"
          color-icon="#179C49"
          v-if="!empty"
        />
      </router-link>
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
}

.line-table--last {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.line-table__item {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 12px;
  border-right: 1px solid #DDE0E8;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.text-item {
  flex: 560;
  overflow: hidden;  
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
  color: color.$colorTextAcccent;
  flex: 165;
}

.dedline-item--overdue {
  color: color.$colorTextNegative;
}

.empty-item {
  justify-content: end;
  flex: 165;
  border-right: none
}
</style>