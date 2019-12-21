import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterFacade } from 'src/app/store/router.facade';
import { Observable, Subscription } from 'rxjs';
import { RouterStateUrl } from 'src/app/store';
import { VacancyItemFacade } from 'src/app/vacancies/vacancy-item/store/vacancy-item.facade';
import { INVITE_VALIDATORS } from 'src/app/validators';

export interface Inivte {
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'tm-invite-candidate-modal',
  templateUrl: './invite-candidate-modal.component.html',
  styleUrls: ['./invite-candidate-modal.component.scss'],
})
export class InviteCandidateModalComponent implements OnInit, OnDestroy {
  inviteForm: FormGroup;
  router$: Observable<RouterReducerState<RouterStateUrl>> = this.routerFacade.router$;
  routerSubscription: Subscription;
  vacancyId: string;

  constructor(
    private formBuilder: FormBuilder,
    private vacancyItemFacade: VacancyItemFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router$.subscribe((res) => (this.vacancyId = res.state.params.id));
    this.createForm();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private createForm(): void {
    this.inviteForm = this.formBuilder.group({
      email: ['', INVITE_VALIDATORS.email],
      firstName: [''],
      lastName: [''],
    });
  }

  onSubmit({ value }: { value: Inivte }): void {
    this.vacancyItemFacade.inviteCandidate(value, this.vacancyId);
  }
}
