import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { BACKGROUND_COLOR_ICON, QUESTIONS_STATUS, TYPE_OF_ICON } from '../../shared/constants';
import { AnswerQuestionsModalComponent } from '../answer-questions-modal/answer-questions-modal.component';
import { CandidateApplicationService } from '../candidate-application.service';
import { CandidateApplicationFacade } from '../store/candidate-application.facade';
import { CandidateQuestion, Type } from '../candidate-question';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tm-candidate-questions-list',
  templateUrl: './candidate-questions-list.component.html',
  styleUrls: ['./candidate-questions-list.component.scss'],
})
export class CandidateQuestionsListComponent implements OnInit, OnDestroy {
  TYPE_OF_ICON = TYPE_OF_ICON;
  BACKGROUND_COLOR_ICON = BACKGROUND_COLOR_ICON;
  QUESTIONS_STATUS = QUESTIONS_STATUS;

  displayedColumns: string[] = ['text', 'type', 'status'];
  dataSource$ = this.candidateApplicationFacade.dataSource$;
  listOfQuestionsSubscriber: Subscription;
  listOfQuestions: CandidateQuestion[];

  constructor(
    public dialog: MatDialog,
    private candidateApplications: CandidateApplicationService,
    private candidateApplicationFacade: CandidateApplicationFacade
  ) {}

  ngOnInit() {
    this.listOfQuestionsSubscriber = this.dataSource$.subscribe((res) => (this.listOfQuestions = res));
    this.candidateApplicationFacade.getCandidateQuestions();
  }

  ngOnDestroy() {
    this.listOfQuestionsSubscriber.unsubscribe();
  }

  openDialog(element: CandidateQuestion): void {
    if (element.type === Type.locked) {
      return;
    }
    this.candidateApplicationFacade.setCurrentQuestion({ id: element.id });
    this.dialog.open(AnswerQuestionsModalComponent, {
      data: {
        index: this.listOfQuestions.indexOf(element),
      },
    });
  }
}
