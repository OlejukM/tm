import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { User } from './user';
import * as fromSelectors from './store/auth.selector';
import * as fromActions from './store/auth.actions';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap, mergeMap } from 'rxjs/operators';
import { RouterStateUrl, getRouterState } from '../store';

@Injectable()
export class AuthGuardService implements CanActivate {
  RXJS_TAKE = 1;
  router$ = this.store.pipe(select(getRouterState));
  checkUrl = new RegExp('^/applications');

  constructor(public router: Router, private store: Store<User>, private storeRouter: Store<RouterStateUrl>) {}

  getFromStoreOrAPI(): Observable<any> {
    // return an Observable stream from the store
    return this.store.pipe(
      // selecting the user state using a feature selector
      select(fromSelectors.hasTokenOrLoggedIn),
      // the tap() operator allows for a side effect, at this
      // point, I'm checking if the token property exists on my
      // Store slice of state or user is logged in
      tap(({ hasAccessToken, isLoggedIn }) => {
        // if user is not logged in but has token, we can fetch the user
        if (!isLoggedIn && hasAccessToken) {
          this.store.dispatch(new fromActions.FetchUser());
        }
        // if there is no token and user isn''t logged in, check in session
        if (!isLoggedIn && !hasAccessToken) {
          // this.redirectToLogin();
          this.store.dispatch(new fromActions.GetTokenFromGoogle());
        }
      }),
      // filter out user state
      filter(({ hasAccessToken, isLoggedIn }) => hasAccessToken && isLoggedIn),
      // which if empty, we will never .take()
      // this is the same as .first() which will only
      // take 1 value from the Observable then complete
      // which does our unsubscribing, technically.
      take(this.RXJS_TAKE)
    );
  }

  canActivate(): Observable<boolean> {
    return this.router$.pipe(
      mergeMap((router) => {
        if (!this.checkUrl.test(router.state.url)) {
          return this.getFromStoreOrAPI().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
          );
        } else {
          return of(true);
        }
      })
    );
  }
}
