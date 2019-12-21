import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { MostRecentEvaluationsService } from '../most-recent-evaluations.service';
import * as fromActions from './applications.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class ApplicationsEffects {
  constructor(private actions$: Actions, private recentEvaluationsService: MostRecentEvaluationsService) {}

  @Effect()
  getApplications$ = this.actions$.pipe(
    ofType<fromActions.GetApplications>(fromActions.ApplicationTypes.GetApplications),
    mergeMap((action) =>
      this.recentEvaluationsService.getApplications(action.payload).pipe(
        map((res) => new fromActions.GetApplicationsSuccess(res)),
        catchError(() => EMPTY)
      )
    )
  );
}
