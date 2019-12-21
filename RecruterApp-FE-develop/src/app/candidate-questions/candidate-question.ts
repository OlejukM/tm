export interface CandidateQuestion {
  description?: string;
  id: string;
  title: string;
  topics?: [];
  type: Type;
  answer?: string;
  status?: string;
  index?: number;
  isDone?: boolean;
}

export enum Type {
  text = 'text',
  code = 'code',
  video = 'video',
  locked = 'locked',
}
