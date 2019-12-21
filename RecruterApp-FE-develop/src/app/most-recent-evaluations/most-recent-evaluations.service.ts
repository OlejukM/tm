import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpParamsInterface } from '../questions/http-params-interface';
import { Observable } from 'rxjs';
import { ApplicationsList } from './applications-list';
import { environment } from '../../environments/environment';
import { ApplicationParams } from './application-params';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class MostRecentEvaluationsService {
  displayedColumns: string[] = ['vacancy', 'candidate', 'score', 'reviewer'];
  API = environment.API_URL;

  applicationParams = {
    limit: 10,
    days: 10,
  };

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getApplications(params: HttpParamsInterface): Observable<ApplicationsList> {
    const httpParams = this.sharedService.generateParams(params);

    return this.http.get<ApplicationsList>(`${this.API}/applications/home/recruiter`, { params: httpParams });
  }

  updateParams(params: ApplicationParams): void {
    this.applicationParams = {
      ...this.applicationParams,
      ...params,
    };
  }
}
