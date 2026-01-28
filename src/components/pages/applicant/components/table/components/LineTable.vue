<script lang="ts" setup>
import ContentWindow from '@/components/shared/elements/modalWindow/content/ContentWindow.vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';
import { ref } from 'vue';

type Expert = {
  display_name: string;
  level: number;
};

type Grades = {
  StructLogic: number;
  ContentMotivation: number;
  ProgramGoals: number;
};

type ExpertData = {
  expert: Expert;
  grades: Grades;
  comment: string
};

interface ILineTableProps {
  data: ExpertData 
}

const {
  data
} = defineProps<ILineTableProps>();

// const emit = defineEmits<{
//   (e: 'changeText', value: string, key: string): void;
// }>();

// const changeText = (text: string) => {
//   emit('changeText', text, keyLine);
// }
</script>

<template>
  <div 
    class="line-table"
  >

    <!-- :class="{'line-table--last' : lastLine}" -->
    <div class="line-table__item expert-item">
      <div>
        <p>{{ data.expert.display_name }}</p>
      </div>
      <div>
        <span></span>
      </div>
    </div>
    
    <div class="double-item">
      <div class="stages__stage motivation-item">
        <p>{{ data.grades.ContentMotivation }}</p>
      </div>
      <div class="stages__stage">
        <p>{{ data.grades.StructLogic }}</p>
      </div>
    </div>
    <div class="line-table__item score-item">
      <p>{{ data.grades.ProgramGoals }}</p>
    </div>
    <div class="line-table__item comment-item">
      <p>{{ data.comment }}</p>
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

.expert-item {
  flex: 254;
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
  flex: 1;
  align-items: center;
}

.motivation-item {
  border-right: 1px solid #DDE0E8;
}

.double-item {
  display: flex;
  flex: 298;
  height: 64px;
  border-right: 1px solid #DDE0E8;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.score-item {
  flex: 106
}

.comment-item {
  flex: 423;
  border-right: none
}
</style>