import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as fromActions from './vacancy-item.action';
import { Application } from '../application';

const one = 1;

export const applicationByVacancyAdapter = createEntityAdapter<Application>({
  selectId: (applicationByVacancy: Application) => applicationByVacancy.id,
});

export interface ApplicationState extends EntityState<Application> {
  count: number;
  statistic: fromActions.Statistic;
}

const initialState: ApplicationState = applicationByVacancyAdapter.getInitialState({
  count: null,
  statistic: null,
});

export function VacancyItemReducer(state: ApplicationState = initialState, action: fromActions.VacancyItemActions) {
  switch (action.type) {
    case fromActions.VacancyItemTypes.GetApplicationByVacancySuccess: {
      return applicationByVacancyAdapter.addAll(action.payload, state);
    }
    case fromActions.VacancyItemTypes.InviteCandidateSuccess: {
      return applicationByVacancyAdapter.addOne(action.payload, { ...state, count: state.count + one });
    }
    case fromActions.VacancyItemTypes.GetStatisticSuccess: {
      return {
        ...state,
        statistic: action.payload,
      };
    }
    case fromActions.VacancyItemTypes.ApplicationLength: {
      return {
        ...state,
        count: action.payload,
      };
    }
    default:
      return state;
  }
}
