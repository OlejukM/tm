import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParamsInterface } from './http-interface';
import { SharedService } from '../shared/services/shared.service';

export interface ServerResponse {
  count: number;
  items: [];
}

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {
  API: string = environment.API_URL;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  loadVacancies(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.API}/vacancies`);
  }

  sort(params: HttpParamsInterface): Observable<ServerResponse> {
    const httpParams = this.sharedService.generateParams(params);

    return this.http.get<ServerResponse>(`${this.API}/vacancies`, { params: httpParams });
  }

  getVacanciesTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API}/settings/vacancies_types`);
  }

  addVacanciesType(type: string): Observable<string> {
    return this.http.post<string>(`${this.API}/settings/vacancies_types`, { name: type });
  }

  private generateParams(params: HttpParamsInterface) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }
}
