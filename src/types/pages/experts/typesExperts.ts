interface StageTask {
  stage_id: number;
  value: number;
}

interface Expert {
  id: number;
  display_name: string;
  level: number;
  is_auth: boolean;
  unreviewed_tasks: StageTask[];
  review_timeout_tasks: StageTask[];
  deadline_tasks: StageTask[];
}

export type TExpertsPageData = Expert[];