import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { switchMap, tap, map, withLatestFrom, catchError } from 'rxjs/operators';
import * as Auth from './auth.actions';
import { SignInFromSessionService } from '../../sign-in-from-session.service';
import { CandidateAuthService } from '../candidate-auth.service';
import { selectApplicationId } from './auth.selector';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  signIn$ = this.actions$.pipe(
    ofType(Auth.ActionTypes.SignIn),
    tap(() => {
      return this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      });
    })
  );

  @Effect()
  getTokenFromGoogle$ = this.actions$.pipe(
    ofType(Auth.ActionTypes.GetTokenFromGoogle),
    switchMap(() => {
      return this.signInService.googleInit().then((token: string) => {
        if (!token) {
          this.router.navigateByUrl('/sign-in');

          return new Auth.GetTokenFromGoogleFail();
        } else {
          return new Auth.GetTokenFromGoogleSuccess(token);
        }
      });
    }),
    catchError(() => EMPTY)
  );

  @Effect({ dispatch: false })
  logOut$ = this.actions$.pipe(
    ofType(Auth.ActionTypes.LogOut),
    tap(() => {
      this.signInService.signOut();

      return this.router.navigateByUrl('/sign-in');
    }),
    catchError(() => EMPTY)
  );

  @Effect({ dispatch: false })
  verificationCodeRequest$ = this.actions$.pipe(
    ofType<Auth.VerificationCodeRequest>(Auth.ActionTypes.VerificationCodeRequest),
    tap((action) => {
      this.candidateAuth.VerificationCodeRequest(action.payload).subscribe();
      this.router.navigateByUrl(`log-in/candidate/${action.payload}`);
    }),
    catchError(() => EMPTY)
  );

  @Effect()
  sendVerificationCode$ = this.actions$.pipe(
    ofType<Auth.SendVerificationCode>(Auth.ActionTypes.SendVerificationCode),
    withLatestFrom(this.store.pipe(select(selectApplicationId))),
    switchMap(([action, appId]) => {
      return this.candidateAuth.sendVerificationCode(action.payload, appId).pipe(
        map((res) => {
          sessionStorage.setItem('token', res.token);
          this.router.navigateByUrl(`/applications/${appId}`);

          return new Auth.SetCandidate(res.user);
        }),
        catchError(() => EMPTY)
      );
    })
  );

  constructor(
    private actions$: Actions,
    private signInService: SignInFromSessionService,
    private router: Router,
    private ngZone: NgZone,
    private store: Store<any>,
    private candidateAuth: CandidateAuthService
  ) {}
}
