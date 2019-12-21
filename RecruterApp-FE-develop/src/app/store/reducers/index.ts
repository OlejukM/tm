import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromAuth from '../../auth/store';
import * as fromQuestions from '../../questions/store/questions.reducer';
import * as fromVacancies from '../../vacancies/store/vacancies.reducers';
import * as fromApplications from '../../most-recent-evaluations/store/applications.reducer';
import * as fromCandidateApplication from '../../candidate-questions/store/candidate-application.reducer';
import * as fromVacancyItem from '../../vacancies/vacancy-item/store/vacancy-item.reducers';
import { User } from 'src/app/auth/user';
import * as fromRecruiters from 'src/app/system-settings/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  question: fromQuestions.QuestionsState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  auth: User;
  vacancy: fromVacancies.VacanciesState;
  application: fromApplications.ApplicationsState;
  vacancyItem: fromVacancyItem.ApplicationState;
  candidateApplication: fromCandidateApplication.CandidateApplicationState;
  recruiter: fromRecruiters.RecruitersState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  question: fromQuestions.QuestionReducer,
  router: fromRouter.routerReducer,
  auth: fromAuth.authReducer,
  vacancy: fromVacancies.vacancyReducer,
  application: fromApplications.ApplicationReducer,
  recruiter: fromRecruiters.recruitersReducer,
  vacancyItem: fromVacancyItem.VacancyItemReducer,
  candidateApplication: fromCandidateApplication.CandidateApplicationReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
