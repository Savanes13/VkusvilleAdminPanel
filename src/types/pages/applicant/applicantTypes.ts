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
  grade_1: number;
  grade_2: number;
};

type GradeRange = {
  StructLogic: {
    min: number;
    max: number;
  };
  ContentMotivation: {
    min: number;
    max: number;
  };
  ProgramGoals: {
    min: number;
    max: number;
  };
};

export interface IApplicantDataType {
  display_name: string;
  grades: Record<string, GradeLine>;
  pass_info: PassInfo;
  grade_range: GradeRange;
};