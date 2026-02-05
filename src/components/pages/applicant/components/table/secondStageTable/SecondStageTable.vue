<script lang="ts" setup>
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import { ref, watch } from 'vue';
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';
import { useRoute } from 'vue-router';
import type { IApplicantDataTypeSecondStage } from '@/types/pages/applicant/applicantTypes';
import { getApplicantPage, pathApplicantScores } from '@/api/pages/applicant/apiApplicant';
import { useCompanyStore } from '@/store/company/companyStore';

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
  pathRequestData.patched_grades
};

const setNewValues = async () => {
  try {
    await pathApplicantScores(pathRequestData);
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
          :last-line="Number(index) === Object.keys(pageDataArr.grades).length"
          @change-scores="(obj) => changesFieldInLine(index, obj)"
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

.control-button {
  width: 242px;
}

.switch-item {
  margin-bottom: 2px;
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

@media (max-width: 600px) {
  .button-management {
    width: 100px;
  }
}

@media (max-width: 475px) {
  .control-block {
    display: block;
  }

  .switch-item {
    margin-bottom: 16px;
  }
}
</style>