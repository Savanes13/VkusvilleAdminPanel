interface Deadline {
  start_date: number;
  start_until: number;
  send_until: number;
  time_to_complete: number;
}

interface GradeCriteria {
  criteria: string
  grades: number[];
}

export interface IStage {
  stage_id: number;
  stage_key: string;
  deadlines: Deadline;
  grades: GradeCriteria[];
  grade_mul: number;
  min_grade_to_pass: number;
}