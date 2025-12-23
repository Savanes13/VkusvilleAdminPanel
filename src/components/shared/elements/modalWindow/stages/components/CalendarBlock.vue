<script lang="ts" setup>
import calendar from "@/assets/images/mainIcons/calendar.svg"
import { ref, watch } from "vue";

interface ICalendarBlockProps {
  date: string
  label: string
};

const {
  date,
  label
} = defineProps<ICalendarBlockProps>();

const dateValue = ref<Date>(new Date(date));

const emit = defineEmits<{
  (e: 'update:date', value: string): void;
}>();

watch(() => date, (newVal) => {
  if (newVal) dateValue.value = new Date(newVal);
});

watch(dateValue, (val) => {
  emit('update:date', val.toISOString()); 
});
</script>

<template>
  <div class="calendar-block">
    <div class="calendar-block__label">
      <p>{{ label }}</p>
    </div>
    <div class="calendar-block__content">
      <div>
        <p>{{ date }}</p>
      </div>
      <div>
        <img :src="calendar" alt="">
      </div>
    </div>

    <VDatePicker v-model="dateValue" />
  </div>
</template> 

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.calendar-block {

}

.calendar-block__label {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  color: color.$colorTextSecondary;
}

.calendar-block__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px 0px 12px;
  height: 40px;
  border: 1px solid #DDE0E8;
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}
</style>