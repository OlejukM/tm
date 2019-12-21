import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromActions from './vacancies.actions';
import { Vacancy } from '../vacancy';

export const vacanciesAdapter = createEntityAdapter<Vacancy>({
  selectId: (vacancy: Vacancy) => vacancy.id,
});

export interface VacanciesState extends EntityState<Vacancy> {
  count: number;
  editVacancy: Vacancy;
  vacancyTypes: string[];
}

const initialState: VacanciesState = vacanciesAdapter.getInitialState({
  count: null,
  editVacancy: null,
  vacancyTypes: null,
});

export function vacancyReducer(
  state: VacanciesState = initialState,
  action: fromActions.VacanciesActions
): VacanciesState {
  switch (action.type) {
    case fromActions.VacanciesActionTypes.LoadVacancies:
      return state;
    case fromActions.VacanciesActionTypes.LoadVacanciesSuccess:
      return vacanciesAdapter.addAll(action.payload, state);
    case fromActions.VacanciesActionTypes.VacanciesLength:
      return {
        ...state,
        count: action.payload,
      };
    case fromActions.VacanciesActionTypes.GetUpdateVacancySuccess:
      return {
        ...state,
        editVacancy: action.payload,
      };
    case fromActions.VacanciesActionTypes.RemoveEditedVacancy:
      return {
        ...state,
        editVacancy: undefined,
      };
    case fromActions.VacanciesActionTypes.GetVacanciesTypesSuccess:
      return {
        ...state,
        ...action.payload,
      };
    case fromActions.VacanciesActionTypes.AddVacanciesTypeSuccess:
      return {
        ...state,
        vacancyTypes: [...state.vacancyTypes, action.payload],
      };
    default:
      return state;
  }
}

export const getVacanciesState = createFeatureSelector<VacanciesState>('vacancy');

export const { selectIds, selectEntities, selectAll, selectTotal } = vacanciesAdapter.getSelectors(getVacanciesState);

const userSelector = createFeatureSelector<VacanciesState>('vacancy');

export const selectCount = createSelector(
  userSelector,
  (state) => state.count
);
export const selectEditVacancy = createSelector(
  userSelector,
  (state) => state.editVacancy
);

export const selectVacanciesTypes = createSelector(
  userSelector,
  (state) => state.vacancyTypes
);
