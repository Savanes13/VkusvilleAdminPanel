type Expert = {
  display_name: string;
  level: number;
};

type Grades = {
  StructLogic: number;
  ContentMotivation: number;
  ProgramGoals: number;
};

type GradeLine = {
  expert: Expert;
  grades: Grades;
  comment: string;
};

type PassInfo = {
  is_passed: boolean;
  total_grade: number;
};

export interface IApplicantDataType {
  display_name: string;
  grades: Record<string, GradeLine>;
  pass_info: PassInfo;
};