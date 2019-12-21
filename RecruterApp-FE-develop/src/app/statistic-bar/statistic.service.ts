import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { StatisticScore } from './statistic-score';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  API = environment.API_URL;

  constructor(private http: HttpClient) {}

  getStatisticScore(): Observable<StatisticScore> {
    return this.http.get<StatisticScore>(`${this.API}/applications/info/statistics?period=10`);
  }
}
