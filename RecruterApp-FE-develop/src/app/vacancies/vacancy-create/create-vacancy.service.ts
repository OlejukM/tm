import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { VACANCY_VALIDATORS } from '../../validators';
import { Vacancy, VacancyUpdate } from '../vacancy';
import { Question } from 'src/app/questions/question';

export interface TypesResponse {
  vacancyTypes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CreateVacancyService {
  API = environment.API_URL;
  vacancy: FormGroup;
  minLength = 3;
  questions: string[] = [];
  editQuestions: Question[] = [];

  constructor(private vacancyForm: FormBuilder, private http: HttpClient) {}

  createForm() {
    return (this.vacancy = this.vacancyForm.group({
      title: ['', VACANCY_VALIDATORS.title],
      type: ['', VACANCY_VALIDATORS.type],
      description: ['', VACANCY_VALIDATORS.description],
      link: ['', VACANCY_VALIDATORS.link],
      status: [''],
    }));
  }

  createVacancy(vacancy: VacancyUpdate): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.API}/vacancies`, vacancy);
  }

  updateVacancy(id: string, vacancy: VacancyUpdate): Observable<Vacancy> {
    return this.http.put<Vacancy>(`${this.API}/vacancies/${id}`, vacancy);
  }

  fetchTypes(): Observable<TypesResponse> {
    return this.http.get<TypesResponse>(`${this.API}/settings/vacancies_types`);
  }
  fetchVacancyById(id: string): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.API}/vacancies/${id}`);
  }
  removeEditQuestions(): void {
    this.editQuestions = [];
  }
}
