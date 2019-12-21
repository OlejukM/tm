import { ApplicationsState } from './applications.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAdapter from './applications.adapter';

export const getApplicationsState = createFeatureSelector<ApplicationsState>('application');

export const selectAllApplications = createSelector(
  getApplicationsState,
  fromAdapter.selectAll
);
