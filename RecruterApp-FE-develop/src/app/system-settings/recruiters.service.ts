import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RecruitersList } from './recruiter-list';

@Injectable()
export class RecruitersService {
  API: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getRecruiter(): Observable<RecruitersList> {
    return this.http.get<RecruitersList>(`${this.API}/users/recruiters`);
  }

  addRecruiter(email: string) {
    return this.http.post(`${this.API}/users/recruiters`, { email });
  }
}
