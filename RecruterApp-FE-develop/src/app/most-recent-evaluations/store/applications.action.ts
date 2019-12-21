import { Action } from '@ngrx/store';
import { ApplicationsList } from '../applications-list';
import { ApplicationParams } from '../application-params';

export enum ApplicationTypes {
  GetApplications = '[Applications] Get Applications',
  GetApplicationsSuccess = '[Applications] Get Applications Success',
}

export class GetApplications implements Action {
  readonly type = ApplicationTypes.GetApplications;

  constructor(public payload: ApplicationParams) {}
}

export class GetApplicationsSuccess implements Action {
  readonly type = ApplicationTypes.GetApplicationsSuccess;

  constructor(public payload: ApplicationsList) {}
}

export type ApplicationActions = GetApplications | GetApplicationsSuccess;
