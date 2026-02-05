type Expert = {
  display_name: string;
  level: number;
};

type GradesFirst = {
  StructLogic: number;
  ContentMotivation: number;
  ProgramGoals: number;
};

type GradesSecond = {
  Integrity: number;
  Arguments: number;
  RealisticMeaningful: number;
  Original: number;
};

type GradeLineFirst = {
  expert: Expert;
  grades: GradesFirst;
  comment: string | null;
};

type GradeLineSecond = {
  expert: Expert;
  grades: GradesSecond;
  comment: string | null;
};

type PassInfo = {
  is_passed: boolean;
  total_grade: number;
  grade_1: number;
  grade_2: number;
};

export type IGradeRangeFirst = {
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

export type IGradeRangeSecond = {
  Integrity: {
    min: number;
    max: number;
  };
  Arguments: {
    min: number;
    max: number;
  };
  RealisticMeaningful: {
    min: number;
    max: number;
  };
  Original: {
    min: number;
    max: number;
  };
};

export interface IApplicantDataTypeFirstStage {
  display_name: string;
  grades: Record<string, GradeLineFirst>;
  pass_info: PassInfo;
  grade_range: IGradeRangeFirst;
};

export interface IApplicantDataTypeSecondStage {
  display_name: string;
  grades: Record<string, GradeLineSecond>;
  pass_info: PassInfo;
  grade_range: IGradeRangeSecond;
};