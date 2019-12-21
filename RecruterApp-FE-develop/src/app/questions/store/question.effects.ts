import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { QuestionsHttpRequestsService } from '../questions-http-requests.service';
import * as fromActions from './question.actions';
import { UpdateQuestion } from './question.actions';
import { Question } from '../question';
import { Topics } from '../questions-library/topics';

@Injectable()
export class QuestionEffects {
  constructor(private actions$: Actions, private questionsService: QuestionsHttpRequestsService) {}

  @Effect()
  createQuestion$ = this.actions$.pipe(
    ofType<fromActions.CreateQuestion>(fromActions.QuestionActionTypes.CreateQuestion),
    mergeMap((action) => this.questionsService.createQuestion(action.payload)),
    map((question: Question) => new fromActions.CreateQuestionSuccess(question)),
    catchError(() => EMPTY)
  );

  @Effect()
  addTopic$ = this.actions$.pipe(
    ofType<fromActions.AddTopic>(fromActions.QuestionActionTypes.AddTopic),
    mergeMap((action) => this.questionsService.addTopic(action.payload)),
    map((topic) => new fromActions.AddTopicSuccess(topic))
  );

  @Effect()
  getQuestions$ = this.actions$.pipe(
    ofType<fromActions.GetQuestions>(fromActions.QuestionActionTypes.GetQuestions),
    mergeMap((action) =>
      this.questionsService.getQuestions(action.payload).pipe(
        map((res) => new fromActions.GetQuestionsSuccess(res)),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  getSortedQuestion$ = this.actions$.pipe(
    ofType<fromActions.GetSortedQuestions>(fromActions.QuestionActionTypes.GetSortedQuestions),
    mergeMap((action) =>
      this.questionsService.getQuestions(action.payload).pipe(
        map((res) => new fromActions.GetSortedQuestionsSuccess(res['items'])),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  getSortedQuestionAndDelete$ = this.actions$.pipe(
    ofType<fromActions.GetSortedQuestionsAndDelete>(fromActions.QuestionActionTypes.GetSortedQuestionsAndDelete),
    mergeMap((action) =>
      this.questionsService.getQuestions(action.payload.params).pipe(
        mergeMap((res) => {
          return [
            new fromActions.GetSortedQuestionsSuccess(res['items']),
            new fromActions.DeleteQuestions(action.payload.ids),
          ];
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  getTopics$ = this.actions$.pipe(
    ofType<fromActions.GetTopics>(fromActions.QuestionActionTypes.GetTopics),
    mergeMap(() =>
      this.questionsService.getTopics().pipe(
        map((res) => new fromActions.GetTopicsSuccess(res)),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  updateQuestion = this.actions$.pipe(
    ofType<fromActions.UpdateQuestion>(fromActions.QuestionActionTypes.UpdateQuestion),
    map((action: UpdateQuestion) => action.payload),
    mergeMap(({ id, changes }: { id: string; changes: Partial<Question> }) =>
      this.questionsService.updateQuestion(id, changes).pipe(
        map((res: Question) => {
          const { id: questionId, ...update } = res;

          return new fromActions.UpdateQuestionSuccess({ id: questionId, changes: update });
        }),
        catchError(() => EMPTY)
      )
    )
  );
}
