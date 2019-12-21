import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CandidateQuestion } from './candidate-question';
import { VacancyInformation } from './information-bar/vacancy-information';

@Injectable({
  providedIn: 'root',
})
export class CandidateApplicationService {
  API = environment.API_URL;
  applicationId: string;

  constructor(private http: HttpClient) {}

  setApplicationId(id: string): void {
    this.applicationId = id;
  }

  getQuestions(): Observable<CandidateQuestion[]> {
    return this.http.get<CandidateQuestion[]>(`${this.API}/applications/${this.applicationId}/questions`);
  }

  getVacancyInformation(): Observable<VacancyInformation> {
    return this.http.get<VacancyInformation>(`${this.API}/applications/${this.applicationId}/vacancy`);
  }

  sendCandidateAnswer(id: string, answer: Partial<CandidateQuestion>): Observable<CandidateQuestion[]> {
    return this.http.patch<CandidateQuestion[]>(
      `${this.API}/applications/${this.applicationId}/questions/${id}`,
      answer
    );
  }

  submitApplication(time: { time: number }): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.API}/applications/${this.applicationId}/submission`, time);
  }
}
