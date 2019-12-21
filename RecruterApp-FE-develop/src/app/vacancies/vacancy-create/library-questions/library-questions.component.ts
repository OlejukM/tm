import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { QuestionsDialogComponent } from '../../../shared/question-dialog/question-dialog.component';
import { Subscription, Observable } from 'rxjs';
import { Question } from 'src/app/questions/question';
import { QuestionsHttpRequestsService } from 'src/app/questions/questions-http-requests.service';
import { DragAndDropService } from '../drag-and-drop.service';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CreateVacancyService } from '../create-vacancy.service';
import { TYPE_OF_ICON } from '../../../shared/constants';
import { BACKGROUND_COLOR_ICON } from '../../../shared/constants';
import { QuestionParams } from '../../../shared/QuestionParams';
import { QuestionsFacade } from 'src/app/questions/store/question.facade';

@Component({
  selector: 'tm-library-questions',
  templateUrl: './library-questions.component.html',
  styleUrls: ['./library-questions.component.scss'],
})
export class LibraryQuestionsComponent implements OnInit, OnDestroy {
  questionsList: Observable<Question[]> = this.questionsFacade.listOfQuestions$;
  questionListSubscription: Subscription;
  listOfQuestions: Question[];
  scrollerSelector = '.questions-list';
  arrowDirectionIcon = 'baseline-arrow_downward';
  previousLength: number;
  isDescending: boolean;
  searchFieldsSubscription: Subscription;
  searchQuestions = false;
  pageIndex = 0;
  debounceTime = 200;
  minLength = 5;
  searchForm: FormGroup = new FormGroup({
    title: new FormControl(),
  });
  currentUserId$ = this.questionsFacade.currentUserId$;
  currentUserRole$ = this.questionsFacade.currentUserRole$;

  TYPE_OF_ICON = TYPE_OF_ICON;

  BACKGROUND_COLOR_ICON = BACKGROUND_COLOR_ICON;

  defaultParams: QuestionParams = {
    skip: 0,
    limit: 10,
    title: '',
    order: 'ASC',
  };

  title$: Observable<string> = this.searchForm.get('title').valueChanges.pipe(
    startWith(''),
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  constructor(
    private questionsHttpRequests: QuestionsHttpRequestsService,
    private dragDrop: DragAndDropService,
    private createVacancyService: CreateVacancyService,
    private dialog: MatDialog,
    private questionsFacade: QuestionsFacade
  ) {}

  ngOnInit(): void {
    this.searchValues();
    this.questionsFacade.getQuestions(this.defaultParams);
    this.questionListSubscription = this.questionsList.subscribe((res) => {
      this.listOfQuestions = res;
      this.questionsFacade.deleteQuestions(this.createVacancyService.questions);
    });
  }

  ngOnDestroy(): void {
    this.questionsHttpRequests.updateParams(this.defaultParams);
    this.questionListSubscription.unsubscribe();
  }

  loadMore(): void {
    if (this.questionsHttpRequests.questionsParams['title'] === '') {
      this.pageIndex++;
      const params: QuestionParams = {
        skip: this.pageIndex * this.questionsHttpRequests.questionsParams.limit,
      };

      this.questionsHttpRequests.updateParams(params);
      this.questionsFacade.deleteQuestions(this.createVacancyService.questions);
      this.questionsFacade.getQuestions(this.questionsHttpRequests.questionsParams);
    }
  }

  sort(): void {
    if (this.questionsHttpRequests.questionsParams['title'] === '') {
      this.switchIsDescending();
      this.pageIndex = 0;
      const params: QuestionParams = {
        skip: 0,
        sortBy: 'duration',
        order: this.isDescending ? 'DESC' : 'ASC',
      };

      this.questionsHttpRequests.updateParams(params);

      const payload = {
        params: this.questionsHttpRequests.questionsParams,
        ids: this.createVacancyService.questions,
      };

      this.questionsFacade.getSortedQuestionsAndDelete(payload);

      this.switchArrow();
    }
  }

  searchValues(): void {
    this.searchFieldsSubscription = this.title$.subscribe((title) => {
      const params: QuestionParams = {
        title,
        skip: 0,
      };

      this.questionsHttpRequests.updateParams(params);
      this.questionsFacade.getSortedQuestions(this.questionsHttpRequests.questionsParams);
      this.disableSearch(title);
    });
  }

  search(): void {
    this.searchQuestions = !this.searchQuestions;
  }

  switchIsDescending(): void {
    this.isDescending = !this.isDescending;
  }

  disableSearch(title: string): void {
    if (this.searchForm.dirty === true && title === '') {
      this.searchQuestions = false;
    }
  }

  switchArrow(): void {
    if (this.isDescending) {
      this.arrowDirectionIcon = 'baseline-arrow_upward';
    } else {
      this.arrowDirectionIcon = 'baseline-arrow_downward';
    }
  }

  drop(event: CdkDragDrop<Question[]>): void {
    this.dragDrop.drop(event);
  }

  checkLength(): boolean {
    return this.listOfQuestions.length < this.minLength;
  }

  checkButton(): boolean {
    return !this.searchQuestions && this.checkLength();
  }

  addQuestion(): void {
    this.dialog.open(QuestionsDialogComponent);
  }

  onEdit(question: Question): void {
    this.dialog.open(QuestionsDialogComponent, { data: { question } });
  }
}
