import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSelector from './recruiter.selector';
import { map } from 'rxjs/operators';
import { GetRecruiters, AddRecruiter } from './recruiters.actions';

@Injectable({ providedIn: 'root' })
export class RecruiterFacade {
  allRecruiters$ = this.store.pipe(
    select(fromSelector.selectAllRecruiters),
    map((recruiters) => {
      return recruiters.map((rec) => `${rec.firstName} ${rec.lastName}`);
    })
  );

  constructor(private store: Store<any>) {}

  getRecruiters() {
    this.store.dispatch(new GetRecruiters());
  }

  addRecruiter(email: string): void {
    this.store.dispatch(new AddRecruiter(email));
  }
}
