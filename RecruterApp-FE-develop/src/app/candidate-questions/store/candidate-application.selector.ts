import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAdapter from './candidate-application.adapter';
import { CandidateApplicationState } from './candidate-application.reducer';

export const getCandidateApplicationState = createFeatureSelector<CandidateApplicationState>('candidateApplication');

export const selectAllCandidateQuestions = createSelector(
  getCandidateApplicationState,
  fromAdapter.selectAll
);

export const getCurrentQuestionId = createSelector(
  getCandidateApplicationState,
  (state) => state.currentQuestionId
);

export const getCurrentQuestionIndex = createSelector(
  selectAllCandidateQuestions,
  getCurrentQuestionId,
  (array, questionId) => array.map((item) => item.id).indexOf(questionId)
);

export const getCurrentQuestion = createSelector(
  getCandidateApplicationState,
  (state) => state.entities[state.currentQuestionId]
);

export const canSubmitFormSelector = createSelector(
  selectAllCandidateQuestions,
  (questions) => questions.every((q) => q.isDone)
);
