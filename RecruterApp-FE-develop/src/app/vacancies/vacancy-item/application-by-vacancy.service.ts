import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpParamsInterface } from '../http-interface';
import { Application } from './application';
import { SharedService } from 'src/app/shared/services/shared.service';

export interface ApplicationServerResponse {
  count: number;
  items: Application[];
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationByVacancyService {
  API: string = environment.API_URL;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  loadApplicationsByVacancy(id: string, params: HttpParamsInterface): Observable<ApplicationServerResponse> {
    const httpParams = this.sharedService.generateParams(params);

    return this.http.get<ApplicationServerResponse>(`${this.API}/vacancies/${id}/applications`, { params: httpParams });
  }
}
