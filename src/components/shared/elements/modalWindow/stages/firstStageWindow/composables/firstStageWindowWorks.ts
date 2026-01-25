import type { IInputDefaultProps } from "@/types/inputs/types";
import { computed, reactive } from "vue";
import type { Stage } from "../FirstStageWindow.vue";

export default function firstStageWindowWorks (props: { data: Stage }, emit: (e: 'close') => void) {  
  const localStage = reactive<Stage>({
    stage_id: props.data.stage_id,
    stage_key: props.data.stage_key,
    grade_mul: props.data.grade_mul,
    min_grade_to_pass: props.data.min_grade_to_pass,
    deadlines: {
      start_date: props.data.deadlines.start_date,
      start_utill: props.data.deadlines.start_utill,
      send_until: props.data.deadlines.send_until,
      time_to_complete: props.data.deadlines.time_to_complete,
    },
    grades: props.data.grades.map(g => ({
      criteria: g.criteria,
      grades: [...g.grades],
    })),
  });
  
  const closeWindow = () => {
    emit("close");
  };
  
  const dayToWorkInputObj = reactive<IInputDefaultProps>({
    value: '',
    label: 'Дней на выполнение задания',
    placeholder: '',
    error: {
      show: false,
      text: ''
    },
  });
  
  const multiplierInputObj = reactive<IInputDefaultProps>({
    value: '',
    label: 'Множитель',
    placeholder: '',
    error: {
      show: false,
      text: ''
    },
  });
  
  const passingGradeInputObj = reactive<IInputDefaultProps>({
    value: '',
    label: 'Проходной балл',
    placeholder: '',
    error: {
      show: false,
      text: ''
    },
  });
  
  const structLogic = computed(() => localStage.grades.find(item => item.criteria === 'StructLogic')?.grades ?? []);
  const contentMotivation = computed(() => localStage.grades.find(item => item.criteria === 'ContentMotivation')?.grades ?? []);
  const programGoals = computed(() => localStage.grades.find(item => item.criteria === 'ProgramGoals')?.grades ?? []);
  
  const timeToCompleteStr = computed({
    get: () => String(localStage.deadlines.time_to_complete),
    set: (val: string) => {
      const num = Number(val);
      localStage.deadlines.time_to_complete = isNaN(num) ? 0 : num
    },
  })
  
  const gradeMulStr = computed({
    get: () => String(localStage.grade_mul),
    set: (val: string) => {
      const num = Number(val)
      localStage.grade_mul = isNaN(num) ? 0 : num
    }
  })
  
  const minGradePass = computed({
    get: () => String(localStage.min_grade_to_pass),
    set: (val: string) => {
      const num = Number(val)
      localStage.min_grade_to_pass = isNaN(num) ? 0 : num
    }
  })
  
  const updateDate = (date: string, type: string) => {
    if (type === 'start') localStage.deadlines.start_date = new Date(date).getTime();
    if (type === 'opportunity') localStage.deadlines.start_utill = new Date(date).getTime();
    if (type === 'deadline') localStage.deadlines.send_until = new Date(date).getTime();
  };
  
  function timestampToDateString(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const addNewScore = (nameBlock: string, id: number) => {
    const block = localStage.grades.find(item => item.criteria === nameBlock);
    if (!block) return
    if (!block.grades.includes(id)) {
      block.grades.push(id)
    } else {
      const index = block.grades.indexOf(id)
      block.grades.splice(index, 1)
    }
  }

  return {
    localStage,
    timeToCompleteStr,
    gradeMulStr,
    minGradePass,
    dayToWorkInputObj,
    multiplierInputObj,
    passingGradeInputObj,

    structLogic,
    contentMotivation,
    programGoals,

    closeWindow,
    timestampToDateString,
    updateDate,
    addNewScore
  }
}

