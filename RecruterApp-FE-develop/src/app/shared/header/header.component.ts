import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from 'src/app/auth/user';
import * as fromActions from './../../auth/store/auth.actions';
import { selectRole } from 'src/app/auth/store';

@Component({
  selector: 'tm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<User>) {}

  userRole$ = this.store.select(selectRole);

  ngOnInit() {}

  logOut(): void {
    this.store.dispatch(new fromActions.LogOut());
  }
}
