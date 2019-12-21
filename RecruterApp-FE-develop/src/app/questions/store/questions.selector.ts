import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuestionsState } from './questions.reducer';

const questionSelector = createFeatureSelector<QuestionsState>('question');

export const selectTopics = createSelector(
  questionSelector,
  (state) => state.topics
);

export const totalQuestions = createSelector(
  questionSelector,
  (state) => state.count
);
