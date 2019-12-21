import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

declare const gapi: any; // Google API need this

@Injectable({
  providedIn: 'root',
})
export class SignInFromSessionService {
  private scope = ['profile', 'email'].join(' ');

  constructor() {}

  googleInit(): Promise<string> {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        gapi.auth2
          .init({
            client_id: environment.clientId,
            cookiepolicy: 'none',
            scope: this.scope,
          })
          .then((auth) => {
            const token = auth.currentUser.get().getAuthResponse().id_token;

            return resolve(token);
          });
      });
    });
  }

  signOut(): void {
    gapi.load('auth2', () => {
      gapi.auth2
        .init({
          client_id: environment.clientId,
          cookiepolicy: 'none',
          scope: this.scope,
        })
        .then((auth) => {
          auth.signOut();
        });
    });
  }
}
