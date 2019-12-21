import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from '../store/auth.actions';
import { environment } from '../../../environments/environment';
import { User } from '../user';
import { Observable } from 'rxjs';

declare const gapi: any; // Google API need this

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  private scope = ['profile', 'email'].join(' ');

  auth2: any;
  API = environment.API_URL;

  constructor(private store: Store<User>, private http: HttpClient) {}

  googleInit(element): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.clientId,
        cookiepolicy: 'none',
        scope: this.scope,
      });
      this.attachSignin(element);
    });
  }

  attachSignin(element): void {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      if (token) {
        this.store.dispatch(new AuthActions.SignIn(token));
      }
    });
  }

  fetchUser(): Observable<any> {
    return this.http.post(`${this.API}/signin`, {});
  }
}
