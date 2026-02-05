<script lang="ts" setup>
import { mainIcons } from '@/components/shared/icons/mainIcons';
import type { IGradeRangeFirst } from '@/types/pages/applicant/applicantTypes';
import { reactive, ref, watch } from 'vue';

type TEditingKey = 'ContentMotivation' | 'StructLogic' | 'ProgramGoals';

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
  comment: string | null
};

interface ILineTableProps {
  data: ExpertData;
  editingIsActive: boolean;
  undoChangesTriger: boolean;
  gradeRange: IGradeRangeFirst;
  lastLine: boolean;
}

type GradeErrors = Partial<Record<TEditingKey, string>>;

const props = defineProps<ILineTableProps>();

const emit = defineEmits<{
  (e: 'changeScores', obj: Grades): void;
  (e: 'errors', obj: GradeErrors): void;
}>();

const editingKey = ref<null | TEditingKey>(null);
const errors = reactive<GradeErrors>({});

// локальная копия объекта строки
const localData = reactive<ExpertData>({
  expert: { ...props.data.expert },
  grades: { ...props.data.grades },
  comment: props.data.comment
});

watch(() => props.undoChangesTriger, () => {
  localData.expert = { ...props.data.expert };
  localData.grades = { ...props.data.grades };
  localData.comment = props.data.comment;
}, { deep: true });



watch(() => errors, (errorsGrades) => {
    emit('errors', errorsGrades);
  },{ deep: true }
);



const toggleEditingKey = (key: TEditingKey) => {
  if (editingKey.value === key) {
    editingKey.value = null;
  } else {
    editingKey.value = key
  };
};




const validateGrade = (key: TEditingKey, value: number) => {
  const range = props.gradeRange[key];
  if (!Number.isFinite(value)) {
    return 'Введите число';
  }
  if (value < range.min || value > range.max) {
    return `Значение должно быть от ${range.min} до ${range.max}`;
  }
  return null;
};


const onBlurGrade = (key: TEditingKey) => {
  const value = localData.grades[key];
  const error = validateGrade(key, value);
  if (error) {
    errors[key] = error;
    return;
  }
  delete errors[key];
  editingKey.value = null;
};


watch(
  () => localData.grades,
  (grades) => {
    const hasErrors = (Object.keys(grades) as TEditingKey[]).some((key) => {
      const error = validateGrade(key, grades[key]);
      if (error) {
        errors[key] = error;
        return true;
      }
      delete errors[key];
      return false;
    });

    if (!hasErrors) {
      emit('changeScores', { ...grades });
    }
  },
  { deep: true }
);
</script>

<template>
  <div 
    class="line-table"
    :class="{'line-table--last' : lastLine && !editingIsActive}"
  >

    <div class="line-table__item expert-item">
      <div>
        <p>{{ data.expert.display_name }}</p>
      </div>
      <div>
        <span
          v-if="props.data.expert.level === 1"
          class="svg"
          v-html="mainIcons['levelOne']"
        ></span>
        <span
          v-else
          class="svg"
          v-html="mainIcons['levelTwo']"
        ></span>
      </div>
    </div>

    <!-- {{ errors }} -->

    <div class="double-item">
      <div 
        class="stages__stage motivation-item edit-item" 
        :class="{
          'edit-item--active' : editingKey === 'ContentMotivation' && props.editingIsActive,
          'edit-item--error' : errors.ContentMotivation
         }"
        @dblclick="toggleEditingKey('ContentMotivation')"
      >
        <input
          type="number"
          class="editable-input"
          :class="{
            'editable-input--active' : editingKey === 'ContentMotivation' && props.editingIsActive,
            'editable-input--error' : errors.ContentMotivation
          }"
          v-if="editingKey === 'ContentMotivation' && props.editingIsActive"
          v-model.number="localData.grades.ContentMotivation"
          @blur="onBlurGrade('ContentMotivation')"
          autofocus
        />
        <p v-else>{{ localData.grades.ContentMotivation }}</p>
      </div>
      
      <div 
        class="stages__stage edit-item"
        :class="{
          'edit-item--active' : editingKey === 'StructLogic' && props.editingIsActive,
          'edit-item--error' : errors.StructLogic
         }"
        @dblclick="toggleEditingKey('StructLogic')"
      >
        <input
          type="number"
          class="editable-input"
          :class="{
            'editable-input--active' : editingKey === 'StructLogic' && props.editingIsActive,
            'editable-input--error' : errors.StructLogic
          }"
          v-if="editingKey === 'StructLogic' && props.editingIsActive"
          v-model.number="localData.grades.StructLogic"
          @blur="onBlurGrade('StructLogic')"
          autofocus
        />
        <p v-else>{{ localData.grades.StructLogic }}</p>
      </div>
    </div>
    <div 
      class="line-table__item score-item edit-item"
      :class="{
        'edit-item--active' : editingKey === 'ProgramGoals' && props.editingIsActive,
        'edit-item--error' : errors.ProgramGoals
       }"
      @dblclick="toggleEditingKey('ProgramGoals')"
    >
      <input
        type="number"
        class="editable-input"
        :class="{
          'editable-input--active' : editingKey === 'ProgramGoals' && props.editingIsActive,
          'editable-input--error' : errors.ProgramGoals
        }"
        v-if="editingKey === 'ProgramGoals' && props.editingIsActive"
        v-model.number="localData.grades.ProgramGoals"
        @blur="onBlurGrade('ProgramGoals')"
        autofocus
      />
      <p v-else>{{ localData.grades.ProgramGoals }}</p>
    </div>
    <div class="line-table__item comment-item">
      <p >{{ data.comment }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

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
  justify-content: space-between;
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

.edit-item {
  transition: background-color transition.$medium;
  cursor: pointer;
}

.edit-item:hover {
  background: color.$colorBackgroundWhite_Hover;
}

.edit-item--error {
  background: color.$colorBackgroundNegativeTint !important;
}

.edit-item--active {
  background: color.$colorBackgroundAccentAlternative;
}

.editable-input--active:hover {
  background: color.$colorBackgroundAccentAlternative !important;
}

.editable-input--active {
  background: color.$colorBackgroundAccentAlternative;
}

.editable-input--error {
  background: color.$colorBackgroundNegativeTint !important;
}

.editable-input {
  height: 100%;
  width: 80%;
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Chrome, Edge, Safari */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>