import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromActions from '../auth/store/auth.actions';
import { GoogleSigninService } from '../auth/google-signin/google-signin.service';

@Injectable()
export class SignInEffects {
  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.FetchUser),
    mergeMap(() =>
      this.googleSignIn.fetchUser().pipe(
        map((user) => new fromActions.FetchUserSuccess(user)),
        catchError(() => EMPTY)
      )
    )
  );

  constructor(private actions$: Actions, private googleSignIn: GoogleSigninService) {}
}
