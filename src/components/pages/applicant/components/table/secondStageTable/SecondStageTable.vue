<script lang="ts" setup>
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import { ref, watch } from 'vue';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';
import { useRoute } from 'vue-router';
import type { IApplicantDataTypeSecondStage } from '@/types/pages/applicant/applicantTypes';
import { getApplicantPage, pathApplicantScores } from '@/api/pages/applicant/apiApplicant';
import { useCompanyStore } from '@/store/company/companyStore';
import FinalAssessment from '../../FinalAssessment.vue';
import { mainIcons } from '@/components/shared/icons/mainIcons';

type Grades = {
  Integrity: number;
  Arguments: number;
  RealisticMeaningful: number;
  Original: number;
};

type PathRequestData = {
  abit_id: number;
  task_id: number;
  patched_grades: {
    [key: string]: Grades; 
  };
};

interface IFirstStageTableProps {
  editingIsActive: boolean
}

type TEditingKey = 'Integrity' | 'Arguments' | 'RealisticMeaningful' | 'Original';

type GradeErrors = Partial<Record<TEditingKey, string>>;

const {
  editingIsActive,
} = defineProps<IFirstStageTableProps>();

const emit = defineEmits<{
  (e: 'finishEditing'): void
}>();

const route = useRoute();
const applicantId = route.params.id;
const pageDataArr = ref<null | IApplicantDataTypeSecondStage>(null);
const companyStore = useCompanyStore();
const undoChangesTriger = ref<boolean>(false);
const showErrorsBlock = ref<boolean>(false);
const allErrors = ref<Record<string, GradeErrors>>({});
const combinedError = ref<string | null>(null);


// const ApplicantStab = {
//   display_name: "Тестовый Персонаж",
//   grades: {
//     3: {
//       expert: {
//         display_name: "Мамут Рахал",
//         level: 2
//       },
//       grades: {
//         Integrity: 2,
//         Arguments: 2,
//         RealisticMeaningful: 4,
//         Original: 2
//       },
//       comment: "Ну наш слоняра ну харош"
//     },
//     4: {
//       expert: {
//         display_name: "Мамут Рахал",
//         level: 1
//       },
//       grades: {
//         Integrity: 2,
//         Arguments: 2,
//         RealisticMeaningful: 4,
//         Original: 2
//       },
//       comment: 'fdsfd'
//     }
//   },
//   pass_info: {
//     is_passed: true,
//     total_grade: 12,
//     grade_1: 12,
//     grade_2: 12
//   },
//   grade_range: {
//     Integrity: {
//       min: 0,
//       max: 2
//     },
//     Arguments: {
//       min: 0,
//       max: 8
//     },
//     RealisticMeaningful: {
//       min: 0,
//       max: 2
//     },
//     Original: {
//       min: 0,
//       max: 2
//     },
//   }
// };

const pathRequestData: PathRequestData = {
  abit_id: Number(applicantId),
  task_id: 2,
  patched_grades: {} 
};

const finishEditing = () => {
  emit('finishEditing')
};

const undoChanges = () => {
  undoChangesTriger.value = !undoChangesTriger.value;
  finishEditing();
};

const changesFieldInLine = (id: string, obj: Grades) => {
  pathRequestData.patched_grades[id] = obj;
  showErrorsBlock.value = false;
};

const valideteNewValue = () => {
  if (combinedError.value) {
    showErrorsBlock.value = true;
    return false
  };
  return true
}

const setNewValues = async () => {
  try {
    if(!valideteNewValue()) return
    await pathApplicantScores(pathRequestData);
    getPageData();
    finishEditing();
  } catch (error) {
    console.error("ошибка при изменении значений")
  };
};

const getPageData = async () => {
  try {
    if(!applicantId) return;
    // pageDataArr.value = ApplicantStab
    const response = await getApplicantPage(Number(applicantId), 2);
    pageDataArr.value = response;
  } catch (error) {
    console.error('ошибка при получении данных страницы')
  }
};

watch(() => companyStore.selectedCompany, () => {
    getPageData()
  },{ immediate: true }
)

const closeErrorBlock = () => {
  showErrorsBlock.value = false;
}

const fieldNames: Record<TEditingKey, string> = {
  Integrity: 'Целостность решения',
  Arguments: 'Аргументация предложенного решения',
  RealisticMeaningful: 'Реалистичность и здравый смысл',
  Original: 'Оригинальность подхода',
};

const getErrors = (index: string, errors: GradeErrors) => {
  allErrors.value[index] = errors;
  const combinedArray: string[] = [];
  Object.entries(allErrors.value).forEach(([lineIdx, lineErrors]) => {
    Object.entries(lineErrors).forEach(([field, message]) => {
      if (message) {
        combinedArray.push(`${fieldNames[field as TEditingKey]}: ${message}`);
      }
    });
  });
  const uniqueErrors = Array.from(new Set(combinedArray));
  combinedError.value = uniqueErrors.length > 0 ? uniqueErrors.join('; ') : null;
  console.log('Объединённая ошибка:', combinedError.value);
};
</script>

<template>
  <div 
    class="applicant-table"
    v-if="pageDataArr"
  >
    <div class="table-wrapper">
      <div class="main-table">
        <HeaderTable/>
        <LineTable
          v-for="(item, index) in pageDataArr.grades"
          :data="item"
          :editing-is-active="editingIsActive"
          :undo-changes-triger="undoChangesTriger"
          :grade-range="pageDataArr.grade_range"
          :last-line="Number(index) === Object.keys(pageDataArr.grades).length"
          @change-scores="(obj) => changesFieldInLine(index, obj)"
          @errors="(errors) => getErrors(index, errors)"
        />
      </div>
    </div>
    <div 
      class="save-block"
      v-if="editingIsActive"
    >
      <div class="save-block__buttons">
        <DefaultButton
          class="default-button__size--large default-button__color-gray button-management"
          @click="undoChanges"
        >
          Отменить
        </DefaultButton>
        <DefaultButton
          class="default-button__size--large default-button__color-green button-management"
          @click="setNewValues"
        >
          Сохранить
        </DefaultButton>
      </div>
    </div>
    <div class="assessment-block">
      <FinalAssessment
        title="Итоговая оценка"
        :score="pageDataArr.pass_info.total_grade"
        :show-state="true"
        :passed="pageDataArr.pass_info.is_passed"
      />
      <FinalAssessment
        title="Средняя оценка 1 уровня"
        :score="pageDataArr.pass_info.grade_1"
      />
      <FinalAssessment
        title="Средняя оценка 2 уровня"
        :score="pageDataArr.pass_info.grade_2"
      />
    </div>
    <transition name="fadeFast">
      <div 
        class="errors-block"
        v-if="showErrorsBlock"
      >
        <div>
          <span
            v-html="mainIcons['warning']"
          ></span>
        </div>
        <div>
          <p>{{ combinedError }}</p>
        </div>
        <div  
          @click="closeErrorBlock"
          class="errors-block__close"
        > 
          <span
            v-html="mainIcons['closeGray']"
          ></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.main-table {
  width: 100%;
  min-width: 1800px; 
  border-collapse: collapse;
}

.table-wrapper::-webkit-scrollbar {
  height: 8px !important;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-track {
  background: color.$colorBackgroundSecondary;
  overflow: hidden;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: color.$colorTextTertiary;
  cursor: default !important;
}

.save-block {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 68px;
  border-left: 1px solid #DDE0E8;
  border-right: 1px solid #DDE0E8;
  border-bottom: 1px solid #DDE0E8;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 12px;
}

.save-block__buttons {
  display: flex;
  gap: 16px;
}

.button-management {
  width: 200px;
}

.assessment-block {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.errors-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 422px;
  position: fixed;
  padding: 16px;
  background: color.$colorBlack;
  border-radius: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextWhite;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.errors-block__close {
  cursor: pointer;
}

@media (max-width: 900px) {
  .assessment-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .assessment-block {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .button-management {
    width: 100px;
  }

  .assessment-block {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 450px) {
  .assessment-block {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>