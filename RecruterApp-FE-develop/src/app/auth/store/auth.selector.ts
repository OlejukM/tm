import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '../user';

const userSelector = createFeatureSelector<User>('auth');

export const selectToken = createSelector(
  userSelector,
  (state) => state.token
);

export const selectRole = createSelector(
  userSelector,
  (state) => (state.user ? state.user.role : undefined)
);

export const isLoggedIn = createSelector(
  userSelector,
  (state) => state.isLoggedIn
);

export const hasAccessToken = createSelector(
  userSelector,
  (state) => state.hasAccessToken
);

export const selectId = createSelector(
  userSelector,
  (state) => state.user.id
);

export const selectApplicationId = createSelector(
  userSelector,
  (state) => state.applicationId
);

export const selectUserRole = createSelector(
  userSelector,
  (state) => state.user.role
);

export const hasTokenOrLoggedIn = createSelector(
  userSelector,
  (state) => {
    return {
      hasAccessToken: state.hasAccessToken,
      isLoggedIn: state.isLoggedIn,
    };
  }
);
