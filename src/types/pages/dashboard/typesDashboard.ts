interface Chart {
  id: number;
  titleKey: 'STAGE_1' | 'STAGE_2' | 'STAGE_3' | string;
  totalParticipants: number;
  passedCount: number;
  noPassedCount: number;
}

interface TotalRegistrations {
  all: number;
  forWeek: number;
}

interface AverageScore {
  id: number;
  current: number;
  max: number;
}

interface DeadlineTasks {
  applicants: number;
  experts: number;
}


export interface IDashboardData {
  charts: Chart[];
  totalRegistrations: TotalRegistrations;
  averageScore: AverageScore[];
  deadlineTasks: DeadlineTasks;
}
