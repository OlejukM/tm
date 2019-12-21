import { Action } from '@ngrx/store';

import { Vacancy, VacancyUpdate } from '../vacancy';

export enum VacanciesActionTypes {
  LoadVacancies = '[Vacancies] Load Vacancies',
  LoadVacanciesSuccess = '[Vacancies] Load Vacancies Success',
  VacanciesLength = '[Vacancies] Vacancies Length',
  CreateVacancy = '[Vacancies] Create Vacancy',
  UpdateVacancy = '[Vacancies] Update Update',
  GetUpdateVacancySuccess = '[Vacancies] Get edit vacancy success',
  RemoveEditedVacancy = '[Vacancies] Remove Edited Vacancy',
  GetUpdateVacancy = '[Vacancies] Get update vacancy',
  GetVacanciesTypes = '[Vacancies] Get vacancies types',
  GetVacanciesTypesSuccess = '[Vacancies] Get vacancies types success',
  AddVacanciesType = '[Vacancies] Add vacancies types',
  AddVacanciesTypeSuccess = '[Vacancies] Add vacancies types success',
}

export class LoadVacancies implements Action {
  readonly type = VacanciesActionTypes.LoadVacancies;
  constructor(public payload: any) {}
}
export class LoadVacanciesSuccess implements Action {
  readonly type = VacanciesActionTypes.LoadVacanciesSuccess;
  constructor(public payload: Vacancy[]) {}
}
export class VacanciesLength implements Action {
  readonly type = VacanciesActionTypes.VacanciesLength;
  constructor(public payload: number) {}
}
export class CreateVacancy implements Action {
  readonly type = VacanciesActionTypes.CreateVacancy;
  constructor(public payload: VacancyUpdate) {}
}
export class UpdateVacancy implements Action {
  readonly type = VacanciesActionTypes.UpdateVacancy;
  constructor(public payload: { id: string; changes: VacancyUpdate }) {}
}
export class GetUpdateVacancy implements Action {
  readonly type = VacanciesActionTypes.GetUpdateVacancy;
  constructor(public payload: string) {}
}
export class GetUpdateVacancySuccess implements Action {
  readonly type = VacanciesActionTypes.GetUpdateVacancySuccess;
  constructor(public payload: Vacancy) {}
}

export class RemoveEditedVacancy implements Action {
  readonly type = VacanciesActionTypes.RemoveEditedVacancy;
}

export class GetVacanciesTypes implements Action {
  readonly type = VacanciesActionTypes.GetVacanciesTypes;
}

export class GetVacanciesTypesSuccess implements Action {
  readonly type = VacanciesActionTypes.GetVacanciesTypesSuccess;

  constructor(public payload: string[]) {}
}

export class AddVacnciesType implements Action {
  readonly type = VacanciesActionTypes.AddVacanciesType;

  constructor(public payload: string) {}
}

export class AddVacnciesTypeSuccess implements Action {
  readonly type = VacanciesActionTypes.AddVacanciesTypeSuccess;

  constructor(public payload: string) {}
}

export type VacanciesActions =
  | LoadVacancies
  | LoadVacanciesSuccess
  | VacanciesLength
  | CreateVacancy
  | GetVacanciesTypes
  | GetVacanciesTypesSuccess
  | AddVacnciesType
  | AddVacnciesTypeSuccess
  | GetUpdateVacancySuccess
  | RemoveEditedVacancy
  | GetUpdateVacancy;
