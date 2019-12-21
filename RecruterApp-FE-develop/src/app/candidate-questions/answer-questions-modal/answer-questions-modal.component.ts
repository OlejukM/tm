import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { CandidateQuestion } from '../candidate-question';
import { CandidateApplicationFacade } from '../store/candidate-application.facade';
import { CandidateApplicationState } from '../store/candidate-application.reducer';
import * as fromActions from '../store/candidate-application.actions';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'tm-answer-questions-modal',
  templateUrl: './answer-questions-modal.component.html',
  styleUrls: ['./answer-questions-modal.component.scss'],
})
export class AnswerQuestionsModalComponent implements OnInit {
  answerQuestionForm: FormGroup;
  indexIncrementer = 1;
  title: string;
  description: string;
  panelOpenState = false;
  currentQuestionId: string;
  totalQuestions$ = this.candidateApplicationFacade.totalQuestions$;
  RXJS_TAKE = 1;

  currentQuestionIndex$ = this.candidateApplicationFacade.currentQuestionIndex$.pipe(
    map((index) => index + this.indexIncrementer)
  );

  currentQuestion$ = this.candidateApplicationFacade.currentQuestion$.pipe(
    filter((data) => !!data),
    tap((currentQuestion) => (this.currentQuestionId = currentQuestion.id))
  );

  constructor(
    private candidateApplicationFacade: CandidateApplicationFacade,
    private dialogRef: MatDialogRef<AnswerQuestionsModalComponent>,
    private store: Store<CandidateApplicationState>,
    @Inject(MAT_DIALOG_DATA) public data?: { element: CandidateQuestion; index: number }
  ) {}

  ngOnInit() {
    this.currentQuestion$
      .pipe(
        tap((question: CandidateQuestion) => {
          this.answerQuestionForm = new FormGroup({
            answer: new FormControl(question.answer ? question.answer : '', Validators.required),
          });
          this.title = question.title;
          this.description = question.description;
        })
      )
      .subscribe();
  }

  send(): void {
    this.store.dispatch(
      new fromActions.PatchCandidateAnswer({ id: this.currentQuestionId, changes: this.answerQuestionForm.value })
    );
    this.candidateApplicationFacade.canSubmitFormSelector$.subscribe((res) => {
      if (res) {
        this.dialogRef.close();
      }
    });
  }
}
