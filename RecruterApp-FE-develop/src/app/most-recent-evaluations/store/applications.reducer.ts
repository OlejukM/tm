import { EntityState } from '@ngrx/entity';

import { Application } from '../applications';
import * as fromApplication from './applications.action';
import * as fromAdapter from './applications.adapter';
import { initialApplicationState } from './applications.adapter';

export interface ApplicationsState extends EntityState<Application> {}

export function ApplicationReducer(
  state: ApplicationsState = initialApplicationState,
  action: fromApplication.ApplicationActions
): ApplicationsState {
  switch (action.type) {
    case fromApplication.ApplicationTypes.GetApplicationsSuccess:
      return fromAdapter.applicationsAdapter.addAll(action.payload.items, state);
    default:
      return state;
  }
}
