import { Action } from '@ngrx/store';

export enum RecruitersActionsTypes {
  GetRecruiters = '[Recruiters] Get Recruiters',
  GetRecruitersSuccess = '[Recruiters] Get Recruiters Success',
  AddRecruiter = '[Recruiters] Add Recruiter',
  AddRecruiterSuccess = '[Recruiters] Add Recruiter Success',
}

export class GetRecruiters implements Action {
  readonly type = RecruitersActionsTypes.GetRecruiters;
}

export class GetRecruitersSuccess implements Action {
  readonly type = RecruitersActionsTypes.GetRecruitersSuccess;
  constructor(public payload: any) {}
}
export class AddRecruiter implements Action {
  readonly type = RecruitersActionsTypes.AddRecruiter;
  constructor(public payload: string) {}
}

export class AddRecruiterSuccess implements Action {
  readonly type = RecruitersActionsTypes.AddRecruiterSuccess;
  constructor(public payload: object) {}
}

export type RecruitersActions = GetRecruiters | GetRecruitersSuccess | AddRecruiter | AddRecruiterSuccess;
