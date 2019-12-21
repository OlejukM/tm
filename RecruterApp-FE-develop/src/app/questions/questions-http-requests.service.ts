import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Question } from './question';
import { environment } from '../../environments/environment';
import { HttpParamsInterface } from './http-params-interface';
import { QuestionList } from './questions-library/question-list';
import { Topics } from './questions-library/topics';
import { QuestionParams } from '../shared/QuestionParams';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsHttpRequestsService {
  API = environment.API_URL;

  questionsParams: QuestionParams = {
    skip: 0,
    limit: 10,
  };

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  updateParams(params: QuestionParams): void {
    this.questionsParams = {
      ...this.questionsParams,
      ...params,
    };
  }

  createQuestion(newQuery: Question): Observable<Question> {
    return this.http.post<Question>(`${this.API}/questions`, newQuery);
  }

  getQuestions(params: HttpParamsInterface): Observable<QuestionList> {
    const httpParams = this.sharedService.generateParams(params);

    return this.http.get<QuestionList>(`${this.API}/questions`, { params: httpParams });
  }

  getTopics(): Observable<Topics> {
    return this.http.get<Topics>(`${this.API}/settings/question_topics`);
  }

  addTopic(topic: string): Observable<string> {
    return this.http.post<string>(`${this.API}/settings/question_topics`, { topics: [topic] });
  }
  updateQuestion(id: string, updatedQuestion: Partial<Question>): Observable<Question> {
    return this.http.put<Question>(`${this.API}/questions/${id}`, updatedQuestion);
  }
}
