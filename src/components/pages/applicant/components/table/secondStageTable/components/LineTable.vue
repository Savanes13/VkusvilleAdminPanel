<script lang="ts" setup>
import { mainIcons } from '@/components/shared/icons/mainIcons';
import { reactive, ref, watch } from 'vue';

type TEditingKey = 'Integrity' | 'Arguments' | 'RealisticMeaningful' | 'Original';

type Expert = {
  display_name: string;
  level: number;
};

type Grades = {
  Integrity: number;
  Arguments: number;
  RealisticMeaningful: number;
  Original: number;
};

type ExpertData = {
  expert: Expert;
  grades: Grades;
  comment: string | null
};

interface ILineTableProps {
  data: ExpertData;
  editingIsActive: boolean;
  undoChangesTriger: boolean
  lastLine: boolean;
}

const props = defineProps<ILineTableProps>();

const emit = defineEmits<{
  (e: 'changeScores', obj: Grades): void;
}>();

const editingKey = ref<null | TEditingKey>(null);

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

watch(() => localData.grades, (newGrades) => {
    emit('changeScores', { ...newGrades });
  },{ deep: true }
);

const startEditing = (key: TEditingKey) => {
  if (!props.editingIsActive) return;
  if (editingKey.value === key) return;
  editingKey.value = key;
};
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


    <div class="double-item">
      <div 
        class="stages__stage motivation-item edit-item" 
        :class="{'edit-item--active' : editingKey === 'Integrity' && props.editingIsActive }"
        @click="startEditing('Integrity')"
      >
        <input
          class="editable-input"
          :class="{'editable-input--active' : editingKey === 'Integrity' && props.editingIsActive}"
          v-if="editingKey === 'Integrity' && props.editingIsActive"
          v-model.number="localData.grades.Integrity"
          @blur="editingKey = null"
          autofocus
        />
        <p v-else>{{ localData.grades.Integrity }}</p>
      </div>

      <div 
        class="stages__stage argument-item edit-item"
        :class="{'edit-item--active' : editingKey === 'Arguments' && props.editingIsActive }"
        @click="startEditing('Arguments')"
      >
        <input
          class="editable-input"
          :class="{'editable-input--active' : editingKey === 'Arguments' && props.editingIsActive}"
          v-if="editingKey === 'Arguments' && props.editingIsActive"
          v-model.number="localData.grades.Arguments"
          @blur="editingKey = null"
          autofocus
        />
        <p v-else>{{ localData.grades.Arguments }}</p>
      </div>

      <div 
        class="stages__stage edit-item"
        :class="{'edit-item--active' : editingKey === 'RealisticMeaningful' && props.editingIsActive }"
        @click="startEditing('RealisticMeaningful')"
      >
        <input
          class="editable-input"
          :class="{'editable-input--active' : editingKey === 'RealisticMeaningful' && props.editingIsActive}"
          v-if="editingKey === 'RealisticMeaningful' && props.editingIsActive"
          v-model.number="localData.grades.RealisticMeaningful"
          @blur="editingKey = null"
          autofocus
        />
        <p v-else>{{ localData.grades.RealisticMeaningful }}</p>
      </div>
    </div>

    <div 
      class="line-table__item score-item edit-item"
      :class="{'edit-item--active' : editingKey === 'Original' && props.editingIsActive }"
      @click="startEditing('Original')"
    >
      <input
        class="editable-input"
        :class="{'editable-input--active' : editingKey === 'Original' && props.editingIsActive}"
        v-if="editingKey === 'Original' && props.editingIsActive"
        v-model.number="localData.grades.Original"
        @blur="editingKey = null"
        autofocus
      />
      <p v-else>{{ localData.grades.Original }}</p>
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

.argument-item  {
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

.edit-item--active {
  background: color.$colorBackgroundAccentAlternative;
}

.editable-input--active:hover {
  background: color.$colorBackgroundAccentAlternative !important;
}

.editable-input--active {
  background: color.$colorBackgroundAccentAlternative;
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
</style>