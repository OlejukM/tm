import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromActions from './question.actions';
import * as fromSelector from './questions.selector';
import * as fromReducers from './questions.reducer';
import * as fromAuthSelector from '../../auth/store/auth.selector';
import { QuestionParams } from 'src/app/shared/QuestionParams';

@Injectable({
  providedIn: 'root',
})
export class QuestionsFacade {
  listOfQuestions$ = this.store.pipe(select(fromReducers.selectAll));
  totalQuestions$ = this.store.pipe(select(fromSelector.totalQuestions));
  currentUserId$ = this.store.pipe(select(fromAuthSelector.selectId));
  topics$ = this.store.pipe(select(fromSelector.selectTopics));
  currentUserRole$ = this.store.pipe(select(fromAuthSelector.selectUserRole));

  constructor(private store: Store<fromReducers.QuestionsState>) {}

  getQuestions(params): void {
    this.store.dispatch(new fromActions.GetQuestions(params));
  }

  getSortedQuestions(params): void {
    this.store.dispatch(new fromActions.GetSortedQuestions(params));
  }

  getTopics(): void {
    this.store.dispatch(new fromActions.GetTopics());
  }

  deleteQuestions(ids: string[]): void {
    this.store.dispatch(new fromActions.DeleteQuestions(ids));
  }

  getSortedQuestionsAndDelete(payload: { params: QuestionParams; ids: string[] }): void {
    this.store.dispatch(new fromActions.GetSortedQuestionsAndDelete(payload));
  }

  addTopic(topic: string): void {
    this.store.dispatch(new fromActions.AddTopic(topic));
  }
}
