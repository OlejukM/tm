import { Action } from '@ngrx/store';

import { HttpParamsInterface } from '../../http-interface';
import { Application } from '../application';
import { Inivte } from 'src/app/shared/invite-candidate-modal/invite-candidate-modal.component';

export interface Statistic {
  status: string;
  avgScore: number;
  completed: number;
  opened: Date;
}

export enum VacancyItemTypes {
  GetApplicationByVacancy = '[ApplicationByVacancy] GetApplicationsByVacancy',
  GetApplicationByVacancySuccess = '[ApplicationByVacancy] GetApplicationsByVacancySuccess',
  ApplicationLength = '[ApplicationByVacancy] ApplicationLength',
  InviteCandidate = '[ApplicationByVacancy] Invite Candidate',
  InviteCandidateSuccess = '[ApplicationByVacancy] Invite Candidate success',
  GetStatistic = '[ApplicationByVacancy] Get Statistic',
  GetStatisticSuccess = '[ApplicationByVacancy] Get Statistic success',
}

export class GetApplicationByVacancy implements Action {
  readonly type = VacancyItemTypes.GetApplicationByVacancy;
  constructor(
    public payload: {
      params: HttpParamsInterface;
      id: string;
    }
  ) {}
}

export class GetApplicationByVacancySuccess implements Action {
  readonly type = VacancyItemTypes.GetApplicationByVacancySuccess;
  constructor(public payload: Application[]) {}
}

export class ApplicationLength implements Action {
  readonly type = VacancyItemTypes.ApplicationLength;
  constructor(public payload: number) {}
}

export class InviteCandidate implements Action {
  readonly type = VacancyItemTypes.InviteCandidate;
  constructor(public payload: { candidate: Inivte; id: string }) {}
}

export class InviteCandidateSuccess implements Action {
  readonly type = VacancyItemTypes.InviteCandidateSuccess;
  constructor(public payload: Application) {}
}

export class GetStatistic implements Action {
  readonly type = VacancyItemTypes.GetStatistic;
  constructor(public payload: string) {}
}

export class GetStatisticSuccess implements Action {
  readonly type = VacancyItemTypes.GetStatisticSuccess;
  constructor(public payload: Statistic) {}
}

export type VacancyItemActions =
  | GetApplicationByVacancy
  | GetApplicationByVacancySuccess
  | ApplicationLength
  | InviteCandidate
  | InviteCandidateSuccess
  | GetStatistic
  | GetStatisticSuccess;
