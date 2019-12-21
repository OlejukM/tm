import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { QuestionsHttpRequestsService } from '../../questions-http-requests.service';
import { Question } from '../../question';
import { QuestionsDialogComponent } from '../../../shared/question-dialog/question-dialog.component';
import { QuestionsFacade } from '../../store/question.facade';
import { TYPE_OF_ICON } from '../../../shared/constants';
import { BACKGROUND_COLOR_ICON } from '../../../shared/constants';

@Component({
  selector: 'tm-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  scrollerSelector = '.questions-list';
  isDescending;
  arrowDirectionIcon = 'baseline-arrow_downward';
  pageIndex = 0;

  TYPE_OF_ICON = TYPE_OF_ICON;

  BACKGROUND_COLOR_ICON = BACKGROUND_COLOR_ICON;

  listOfQuestions$ = this.questionsFacade.listOfQuestions$;
  totalQuestions$ = this.questionsFacade.totalQuestions$;
  currentUserId$ = this.questionsFacade.currentUserId$;
  currentUserRole$ = this.questionsFacade.currentUserRole$;

  constructor(
    private questionsHttpRequests: QuestionsHttpRequestsService,
    private questionsFacade: QuestionsFacade,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questionsFacade.getQuestions(this.questionsHttpRequests.questionsParams);
  }

  onScrollDown(): void {
    this.pageIndex++;
    this.questionsHttpRequests.questionsParams.skip = this.pageIndex * this.questionsHttpRequests.questionsParams.limit;
    this.getQuestions();
  }

  sort(): void {
    this.pageIndex = 0;
    this.isDescending = !this.isDescending;
    this.questionsHttpRequests.questionsParams.skip = 0;
    this.questionsHttpRequests.questionsParams['sortBy'] = 'duration';
    this.questionsHttpRequests.questionsParams['order'] = this.isDescending ? 'DESC' : 'ASC';

    this.questionsFacade.getSortedQuestions(this.questionsHttpRequests.questionsParams);

    if (this.isDescending) {
      this.arrowDirectionIcon = 'baseline-arrow_upward';
    } else {
      this.arrowDirectionIcon = 'baseline-arrow_downward';
    }
  }

  onEdit(question: Question) {
    this.dialog.open(QuestionsDialogComponent, {
      data: { question },
    });
  }
}
