import { Component, OnDestroy, OnInit } from '@angular/core';

import { CandidateApplicationFacade } from '../store/candidate-application.facade';
import { combineLatest, Subscription } from 'rxjs';
import { CandidateApplicationService } from '../candidate-application.service';

@Component({
  selector: 'tm-information-bar',
  templateUrl: './information-bar.component.html',
  styleUrls: ['./information-bar.component.scss'],
})
export class InformationBarComponent implements OnInit, OnDestroy {
  questionsSubscriber: Subscription;
  completedQuestion = {
    title: 'Completed questions',
    info: null,
    isAllCompleted: false,
  };
  vacancyType: string;
  vacancyTitle: string;

  constructor(
    private candidateApplicationFacade: CandidateApplicationFacade,
    private candidateApplicationService: CandidateApplicationService
  ) {}

  ngOnInit() {
    this.questionsSubscriber = combineLatest(
      this.candidateApplicationFacade.completedQuestions$,
      this.candidateApplicationFacade.totalQuestions$,
      this.candidateApplicationService.getVacancyInformation()
    ).subscribe(([numberOfCompleted, total, vacancyInformation]) => {
      this.completedQuestion.info = `${numberOfCompleted} out of ${total}`;
      this.completedQuestion.isAllCompleted = numberOfCompleted >= total;
      this.vacancyType = vacancyInformation.type;
      this.vacancyTitle = vacancyInformation.title;
    });
  }

  ngOnDestroy() {
    this.questionsSubscriber.unsubscribe();
  }
}
