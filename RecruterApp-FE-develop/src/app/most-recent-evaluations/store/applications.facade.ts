import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromSelector from './applications.selector';
import * as fromReducers from './applications.reducer';
import * as fromActions from './applications.action';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsFacade {
  dataSource$ = this.store.pipe(select(fromSelector.selectAllApplications));

  constructor(private store: Store<fromReducers.ApplicationsState>) {}

  getApplications(params) {
    this.store.dispatch(new fromActions.GetApplications(params));
  }
}
