import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromReducers from './vacancies.reducers';
import * as fromActions from './vacancies.actions';
import { Observable } from 'rxjs';
import { Vacancy, VacancyUpdate } from '../vacancy';
import { HttpParamsInterface } from '../http-interface';

export interface UpdateVacancy {
  id: string;
  changes: VacancyUpdate;
}

@Injectable({
  providedIn: 'root',
})
export class VacanciesFacade {
  dataSource$: Observable<Vacancy[]> = this.store.pipe(select(fromReducers.selectAll));
  totalLength$: Observable<number> = this.store.pipe(select(fromReducers.selectCount));
  editVacancy$: Observable<Vacancy> = this.store.pipe(select(fromReducers.selectEditVacancy));
  vacanciesTypes$: Observable<string[]> = this.store.pipe(select(fromReducers.selectVacanciesTypes));

  constructor(private store: Store<fromReducers.VacanciesState>) {}

  loadVacancies(params: HttpParamsInterface): void {
    this.store.dispatch(new fromActions.LoadVacancies(params));
  }

  vacanciesLength(length: number): fromActions.VacanciesLength {
    return new fromActions.VacanciesLength(length);
  }

  loadVacanciesSuccess(vacancies: Vacancy[]): fromActions.LoadVacanciesSuccess {
    return new fromActions.LoadVacanciesSuccess(vacancies);
  }

  createVacancy(vacancy: VacancyUpdate): void {
    this.store.dispatch(new fromActions.CreateVacancy(vacancy));
  }

  updateVacancy(vacancy: UpdateVacancy): void {
    this.store.dispatch(new fromActions.UpdateVacancy(vacancy));
  }

  fetchVacancyById(id: string): void {
    this.store.dispatch(new fromActions.GetUpdateVacancy(id));
  }

  getEditedVacancy(vacancy: Vacancy): void {
    this.store.dispatch(new fromActions.GetUpdateVacancySuccess(vacancy));
  }

  removeEditedVacancy(): void {
    this.store.dispatch(new fromActions.RemoveEditedVacancy());
  }

  getVacanciesTypes(): void {
    this.store.dispatch(new fromActions.GetVacanciesTypes());
  }
  addVacancyType(type: string): void {
    this.store.dispatch(new fromActions.AddVacnciesType(type));
  }
}
