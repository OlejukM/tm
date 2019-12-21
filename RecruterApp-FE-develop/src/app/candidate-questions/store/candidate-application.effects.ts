import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { CandidateApplicationService } from '../candidate-application.service';
import * as fromActions from './candidate-application.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CandidateQuestion } from '../candidate-question';
import { PatchCandidateAnswer } from './candidate-application.actions';
import * as fromAuxiliaryFunctions from '../../shared/auxiliary-functions/auxiliary-functions';

@Injectable()
export class CandidateApplicationEffects {
  constructor(private actions$: Actions, private candidateApplicationService: CandidateApplicationService) {}

  @Effect()
  getCandidateQuestions$ = this.actions$.pipe(
    ofType<fromActions.GetCandidateQuestions>(fromActions.CandidateApplicationTypes.GetCandidateQuestions),
    mergeMap(() =>
      this.candidateApplicationService.getQuestions().pipe(
        map((res: CandidateQuestion[]) => {
          const mappedQuestions = fromAuxiliaryFunctions.mapQuestion(res);

          return new fromActions.GetCandidateQuestionsSuccess(mappedQuestions);
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  sendCandidateAnswer$ = this.actions$.pipe(
    ofType<fromActions.PatchCandidateAnswer>(fromActions.CandidateApplicationTypes.PatchCandidateAnswer),
    map((action: PatchCandidateAnswer) => action.payload),
    mergeMap(({ id, changes }: { id: string; changes: Partial<CandidateQuestion> }) =>
      this.candidateApplicationService.sendCandidateAnswer(id, changes).pipe(
        mergeMap((res: CandidateQuestion[]) => {
          const currentQuestion = res.find((question) => !question.isDone);
          const currentQuestionId = currentQuestion ? currentQuestion.id : null;
          const mappedQuestions = fromAuxiliaryFunctions.mapQuestion(res);

          return [
            new fromActions.GetCandidateQuestionsSuccess(mappedQuestions),
            new fromActions.SetCurrentQuestion(currentQuestionId),
          ];
        }),
        catchError(() => {
          return EMPTY;
        })
      )
    )
  );
}
