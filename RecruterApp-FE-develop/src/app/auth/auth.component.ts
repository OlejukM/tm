import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';

import { User } from './user';
import { getRouterState } from '../store';
import { SendVerificationCode, SetApplicationId } from './store';
import { CODE_VALIDATORS } from '../validators';

export interface VerificationForm {
  code: string;
}

@Component({
  selector: 'tm-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  verification: FormGroup;
  router$ = this.store.pipe(select(getRouterState));
  urlCheck = new RegExp('^/log-in/candidate/');
  candidate = false;

  constructor(private store: Store<User>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.router$.subscribe((path) => {
      if (this.urlCheck.test(path.state.url)) {
        this.store.dispatch(new SetApplicationId(path.state.params.id));
        this.candidate = true;
      }
    });

    this.createForm();
  }

  ngOnDestroy() {
    this.candidate = false;
  }

  private createForm(): void {
    this.verification = this.formBuilder.group({
      code: ['', CODE_VALIDATORS.code],
    });
  }

  send({ value }: { value: VerificationForm }): void {
    this.store.dispatch(new SendVerificationCode(value.code));
  }
}
