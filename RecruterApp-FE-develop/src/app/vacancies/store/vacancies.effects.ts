import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import * as fromActions from './vacancies.actions';
import { mergeMap, catchError, tap, map } from 'rxjs/operators';
import { VacanciesService } from '../vacancies.service';
import { EMPTY } from 'rxjs';
import { CreateVacancyService } from '../vacancy-create/create-vacancy.service';
import { VacanciesFacade } from './vacancies.facade';

@Injectable()
export class VacanciesEffects {
  @Effect()
  sort$ = this.actions$.pipe(
    ofType<fromActions.LoadVacancies>(fromActions.VacanciesActionTypes.LoadVacancies),
    mergeMap((action) =>
      this.vacanciesService.sort(action.payload).pipe(
        mergeMap((res) => [
          this.vacanciesFacade.loadVacanciesSuccess(res.items),
          this.vacanciesFacade.vacanciesLength(res.count),
        ]),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect({ dispatch: false })
  createVacancy$ = this.actions$.pipe(
    ofType<fromActions.CreateVacancy>(fromActions.VacanciesActionTypes.CreateVacancy),
    tap((action) => {
      this.createVacancyService.createVacancy(action.payload).subscribe((res) => {
        this.router.navigate(['/vacancies']);
      });
    })
  );

  @Effect({ dispatch: false })
  updateVacancy$ = this.actions$.pipe(
    ofType<fromActions.UpdateVacancy>(fromActions.VacanciesActionTypes.UpdateVacancy),
    tap((action) => {
      this.createVacancyService.updateVacancy(action.payload.id, action.payload.changes).subscribe((res) => {
        this.router.navigateByUrl('/vacancies');
      });
    })
  );

  @Effect()
  fetchVacancyById$ = this.actions$.pipe(
    ofType<fromActions.GetUpdateVacancy>(fromActions.VacanciesActionTypes.GetUpdateVacancy),
    mergeMap((action) =>
      this.createVacancyService.fetchVacancyById(action.payload).pipe(
        map((res) => new fromActions.GetUpdateVacancySuccess(res)),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  getVacanciesTypes$ = this.actions$.pipe(
    ofType<fromActions.GetVacanciesTypes>(fromActions.VacanciesActionTypes.GetVacanciesTypes),
    mergeMap(() => this.vacanciesService.getVacanciesTypes()),
    map((res) => new fromActions.GetVacanciesTypesSuccess(res))
  );

  @Effect()
  addVacanciesType$ = this.actions$.pipe(
    ofType<fromActions.AddVacnciesType>(fromActions.VacanciesActionTypes.AddVacanciesType),
    mergeMap((action) => this.vacanciesService.addVacanciesType(action.payload)),
    map((res) => new fromActions.AddVacnciesTypeSuccess(res))
  );

  constructor(
    private actions$: Actions,
    private vacanciesService: VacanciesService,
    private createVacancyService: CreateVacancyService,
    private router: Router,
    private vacanciesFacade: VacanciesFacade
  ) {}
}
