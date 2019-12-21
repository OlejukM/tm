import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { QuestionsDialogComponent } from '../../shared/question-dialog/question-dialog.component';
import { QuestionsState } from '../store/questions.reducer';

@Component({
  selector: 'tm-questions-library',
  templateUrl: './questions-library.component.html',
  styleUrls: ['./question-library.component.scss'],
})
export class QuestionsLibraryComponent implements OnInit {
  constructor(public dialog: MatDialog, public store: Store<QuestionsState>) {}

  ngOnInit() {}

  createQuestion(): void {
    this.dialog.open(QuestionsDialogComponent);
  }
}
