import * as fromActions from './recruiters.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Recruiter } from '../recruiter';

import * as fromAdapter from './recruiter.adapter';

export interface RecruitersState extends EntityState<Recruiter> {
  count: number;
}

export function recruitersReducer(state = fromAdapter.recruitersInitialState, action: fromActions.RecruitersActions) {
  switch (action.type) {
    case fromActions.RecruitersActionsTypes.GetRecruitersSuccess:
      return fromAdapter.recruitersAdapter.addAll(action.payload.items, {
        ...state,
        count: action.payload.count,
      });

    case fromActions.RecruitersActionsTypes.AddRecruiterSuccess:
      return fromAdapter.recruitersAdapter.addOne(action.payload, state);

    default:
      return state;
  }
}
