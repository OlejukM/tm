import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecruitersState } from './recruiters.reducers';
import * as fromAdapter from './recruiter.adapter';

export const getRecruitersState = createFeatureSelector<RecruitersState>('recruiter');

export const selectAllRecruiters = createSelector(
  getRecruitersState,
  fromAdapter.selectAll
);
