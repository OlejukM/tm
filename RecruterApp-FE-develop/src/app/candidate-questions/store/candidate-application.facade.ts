import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromReducer from './candidate-application.reducer';
import * as fromActions from './candidate-application.actions';
import * as fromSelector from './candidate-application.selector';
import { map } from 'rxjs/operators';
import { CandidateQuestion } from '../candidate-question';

@Injectable({
  providedIn: 'root',
})
export class CandidateApplicationFacade {
  dataSource$ = this.store.pipe(select(fromSelector.selectAllCandidateQuestions));

  completedQuestions$ = this.dataSource$.pipe(
    map((questions: CandidateQuestion[]) => questions.filter(this.isCompleted).length)
  );

  totalQuestions$ = this.dataSource$.pipe(map((questions: CandidateQuestion[]) => questions.length));
  currentQuestion$ = this.store.pipe(select(fromSelector.getCurrentQuestion));
  currentQuestionIndex$ = this.store.pipe(select(fromSelector.getCurrentQuestionIndex));
  canSubmitFormSelector$ = this.store.pipe(select(fromSelector.canSubmitFormSelector));

  constructor(private store: Store<fromReducer.CandidateApplicationState>) {}

  getCandidateQuestions(): void {
    this.store.dispatch(new fromActions.GetCandidateQuestions());
  }

  isCompleted(question: CandidateQuestion): boolean {
    return question.status === 'done';
  }

  setCurrentQuestion({ id }): void {
    this.store.dispatch(new fromActions.SetCurrentQuestion(id));
  }
}
