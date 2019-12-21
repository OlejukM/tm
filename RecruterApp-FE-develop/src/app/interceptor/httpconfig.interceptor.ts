import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as fromStore from '../auth/store/index';
import { User } from '../auth/user';
import { selectRole, LogOut } from '../auth/store/index';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  status = {
    notAthorized: 401,
  };

  constructor(private store: Store<User>, private snackbar: MatSnackBar) {}

  getToken(): Observable<string> {
    return this.store.select(fromStore.selectToken);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    combineLatest(this.getToken(), this.store.select(selectRole)).subscribe(([token, role]) => {
      if (role !== 'candidate' && token !== undefined) {
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token),
        });
      } else {
        const candidateToken = sessionStorage.getItem('token');
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + candidateToken),
        });
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === this.status.notAthorized) {
          this.snackbar.open(`${error.status} ${error.statusText}`, 'OK');
          this.store.dispatch(new LogOut());
        } else {
          this.snackbar.open(`${error.status} ${error.statusText}`, 'OK');
        }

        return throwError(error);
      })
    );
  }
}
