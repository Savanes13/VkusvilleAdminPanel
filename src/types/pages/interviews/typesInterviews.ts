type Interview = {
  id: number;
  start_time: number;
  reviewer_ids: number[];
};

type DayInterviews = {
  day: number;
  interviews: Interview[];
};

export type TInterviewsData = DayInterviews[]
