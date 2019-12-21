import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ApplicationByVacancyService } from '../application-by-vacancy.service';
import * as fromActions from './vacancy-item.action';
import { InviteCandidateService } from 'src/app/shared/invite-candidate-modal/invite-candidate.service';

@Injectable()
export class VacancyItemEffects {
  @Effect()
  loadVacancies$ = this.actions$.pipe(
    ofType<fromActions.GetApplicationByVacancy>(fromActions.VacancyItemTypes.GetApplicationByVacancy),
    mergeMap((action) =>
      this.applicationsByVacancyService.loadApplicationsByVacancy(action.payload.id, action.payload.params)
    ),
    mergeMap((res) => [
      new fromActions.GetApplicationByVacancySuccess(res.items),
      new fromActions.ApplicationLength(res.count),
    ]),
    catchError(() => EMPTY)
  );

  @Effect()
  inviteCandidate$ = this.actions$.pipe(
    ofType<fromActions.InviteCandidate>(fromActions.VacancyItemTypes.InviteCandidate),
    mergeMap((action) => this.inviteCandidateService.inviteCandidate(action.payload.candidate, action.payload.id)),
    map((res) => new fromActions.InviteCandidateSuccess(res))
  );

  @Effect()
  getStatistic$ = this.actions$.pipe(
    ofType<fromActions.GetStatistic>(fromActions.VacancyItemTypes.GetStatistic),
    mergeMap((action) => this.inviteCandidateService.getStatistic(action.payload)),
    map((res) => new fromActions.GetStatisticSuccess(res))
  );

  constructor(
    private actions$: Actions,
    private applicationsByVacancyService: ApplicationByVacancyService,
    private inviteCandidateService: InviteCandidateService
  ) {}
}
