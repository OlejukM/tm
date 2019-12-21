import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApplicationState, applicationByVacancyAdapter } from './vacancy-item.reducers';

export const getVacancyItemsState = createFeatureSelector<ApplicationState>('vacancyItem');

export const selectCount = createSelector(
  getVacancyItemsState,
  (state) => state.count
);

export const selectStatistic = createSelector(
  getVacancyItemsState,
  (state) => state.statistic
);

export const { selectIds, selectEntities, selectAll, selectTotal } = applicationByVacancyAdapter.getSelectors(
  getVacancyItemsState
);
