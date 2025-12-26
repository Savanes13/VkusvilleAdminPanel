<script lang="ts" setup>
import IconButton from '@/components/shared/ui/button/IconButton.vue';

interface ILineTableProps {
  text: string;
  keyLine: string;
  lastLine: boolean;
  empty?: boolean;
}

const {
  text,
  keyLine,
  lastLine = false,
  empty
} = defineProps<ILineTableProps>();
</script>

<template>
  <div 
    class="line-table"
    :class="{'line-table--last' : lastLine}"
  >
    <div class="line-table__item text-item">
      <p>{{ text }}</p>
    </div>
    <div class="line-table__item key-item">
      <p>{{ keyLine }}</p>
    </div>
    <div class="line-table__item empty-item">
      <IconButton
        class="button-icon__color-green-transparent"
        icon="edit"
        color-icon="transparent"
        v-if="!empty"
      />
    </div>

    <!-- Тут модалка -->

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
}

.key-item {
  flex: 330;
}

.empty-item {
  justify-content: end;
  flex: 190;
  border-right: none
}
</style>