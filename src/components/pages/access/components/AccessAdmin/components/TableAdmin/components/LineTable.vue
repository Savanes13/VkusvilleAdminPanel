<script lang="ts" setup>
import { mainIcons } from '@/components/shared/icons/mainIcons';

interface ILineTableProps {
  name: string;
  role: string;
  email: string;
  lastLine: boolean;
}

const {
  name,
  email,
  role,
  lastLine = false
} = defineProps<ILineTableProps>();

const emit = defineEmits<{
  (e: 'close', number: string): void
}>();

const deleteAdmin = () => {
  emit('close', email);
};
</script>

<template>
  <div 
    class="line-table"
    :class="{'line-table--last' : lastLine}"
  >
    <div class="line-table__item">
      <div>
        <p>{{ name }}</p>
      </div>
    </div>
    <div class="line-table__item">
      <div>
        <p>{{ email }}</p>
      </div>
    </div>
    <div class="line-table__item">
      <div>
        <p>{{ role }}</p>
      </div>
    </div>
    <div class="line-table__item button-line">
      <div 
        class="delete-button"
        @click="deleteAdmin"
      >
        <div>
          <span
            v-html="mainIcons['basket']"
          ></span>
        </div>
        <div>
          <p>Удалить</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.line-table {
  display: flex;
  border-left: 1px solid #DDE0E8;
  border-bottom: 1px solid #DDE0E8;
  background: color.$colorBackgroundWhite;
}

.line-table__item {
  display: flex;
  align-items: center;
  height: 64px;
  border-right: 1px solid #DDE0E8;
  padding: 20px 12px 20px 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: color.$colorTextPrimary;
  flex: 1;
}

.button-line {
  justify-content: end;
}

.empty-item {
  border-right: none
}

.delete-button {
  width: 111px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 8px;
  border-radius: 12px;
  background: color.$colorBackgroundNegativeTint;
  transition: background-color transition.$medium;
  color: color.$colorTextNegative;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.delete-button:hover {
  background: color.$colorBackgroundNegativeTint_Hover;
}

.line-table--last {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}
</style>