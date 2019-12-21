import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { RouterStateUrl, getRouterState } from './reducers';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  router$ = this.store.pipe(select(getRouterState));

  constructor(private store: Store<RouterStateUrl>) {}
}
