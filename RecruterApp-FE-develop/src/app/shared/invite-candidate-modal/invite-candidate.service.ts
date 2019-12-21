import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Inivte } from './invite-candidate-modal.component';
import { Observable } from 'rxjs';
import { Application } from 'src/app/vacancies/vacancy-item/application';
import { Statistic } from 'src/app/vacancies/vacancy-item/store/vacancy-item.action';

@Injectable({
  providedIn: 'root',
})
export class InviteCandidateService {
  API = environment.API_URL;

  constructor(private http: HttpClient) {}

  inviteCandidate(candidate: Inivte, id: string): Observable<Application> {
    const inviteForm = {
      candidate,
      vacancy: id,
    };

    return this.http.post<Application>(`${this.API}/applications`, inviteForm);
  }

  getStatistic(id: string): Observable<Statistic> {
    return this.http.get<Statistic>(`${this.API}/vacancies/${id}/statistics`);
  }
}
