import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromActions from './recruiters.actions';
import { RecruitersService } from '../recruiters.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class RecruitersEffects {
  @Effect()
  loadRecruiters$ = this.actions$.pipe(
    ofType<fromActions.GetRecruiters>(fromActions.RecruitersActionsTypes.GetRecruiters),
    mergeMap((action) =>
      this.recruiterService.getRecruiter().pipe(
        map((res) => new fromActions.GetRecruitersSuccess(res)),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  addRecruiter$ = this.actions$.pipe(
    ofType<fromActions.AddRecruiter>(fromActions.RecruitersActionsTypes.AddRecruiter),
    mergeMap((action) => this.recruiterService.addRecruiter(action.payload)),
    map((res) => new fromActions.AddRecruiterSuccess(res)),
    catchError(() => EMPTY)
  );

  constructor(private actions$: Actions, private recruiterService: RecruitersService) {}
}
