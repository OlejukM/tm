import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateAuthService {
  API = environment.API_URL;

  constructor(private http: HttpClient) {}

  VerificationCodeRequest(id: string): Observable<any> {
    return this.http.post(`${this.API}/applications/${id}/verification`, {});
  }

  sendVerificationCode(code: string, id: string): Observable<any> {
    return this.http.post(`${this.API}/applications/${id}/accessToken`, { code });
  }
}
