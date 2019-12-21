import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { User } from './user';
import { getRouterState } from '../store';
import { mergeMap } from 'rxjs/operators';
import { VerificationCodeRequest } from './store';

@Injectable({
  providedIn: 'root',
})
export class CandidateAuthGuard implements CanActivate {
  router$ = this.store.pipe(select(getRouterState));
  checkUrl = new RegExp('^/applications');
  constructor(public router: Router, private store: Store<User>) {}

  candidateAuth(): Observable<boolean> {
    return this.router$.pipe(
      mergeMap((router) => {
        if (!sessionStorage.getItem('token')) {
          this.store.dispatch(new VerificationCodeRequest(router.state.params.id));

          return of(true);
        } else {
          return of(true);
        }
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.router$.pipe(
      mergeMap((router) => {
        if (this.checkUrl.test(router.state.url)) {
          return this.candidateAuth();
        } else {
          return of(true);
        }
      })
    );
  }
}
