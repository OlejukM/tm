import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { selectAll, selectStatistic } from './vacancy-item.selectors';
import * as fromActions from './vacancy-item.action';
import { selectCount } from './vacancy-item.selectors';
import { Inivte } from 'src/app/shared/invite-candidate-modal/invite-candidate-modal.component';
import { ApplicationState } from './vacancy-item.reducers';

@Injectable({
  providedIn: 'root',
})
export class VacancyItemFacade {
  applications$ = this.store.pipe(select(selectAll));
  totalLength$ = this.store.pipe(select(selectCount));
  statistic$ = this.store.pipe(select(selectStatistic));

  constructor(private store: Store<ApplicationState>) {}

  loadApplications(params, id: string): void {
    this.store.dispatch(new fromActions.GetApplicationByVacancy({ params, id }));
  }

  inviteCandidate(candidate: Inivte, id: string): void {
    this.store.dispatch(new fromActions.InviteCandidate({ candidate, id }));
  }

  getStatistic(id: string): void {
    this.store.dispatch(new fromActions.GetStatistic(id));
  }
}
