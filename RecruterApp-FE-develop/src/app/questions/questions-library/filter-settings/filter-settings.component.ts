import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Store } from '@ngrx/store';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { QuestionsHttpRequestsService } from '../../questions-http-requests.service';
import { TM_VALIDATION_FORM_VALUES } from '../../../validation-form-values';
import { QuestionsState } from '../../store/questions.reducer';
import * as fromActions from '../../store/question.actions';
import * as fromSelector from '../../store/questions.selector';
import { QuestionsFacade } from '../../store/question.facade';

@Component({
  selector: 'tm-filter-settings',
  templateUrl: './filter-settings.component.html',
  styleUrls: ['./filter-settings.component.scss'],
})
export class FilterSettingsComponent implements OnInit, OnDestroy {
  constructor(
    private httpRequest: QuestionsHttpRequestsService,
    private store: Store<QuestionsState>,
    private questionFacade: QuestionsFacade
  ) {}

  topicsSubscription: Subscription;
  searchFieldsSubscription: Subscription;
  debounceTime = 300;
  filteredTopics: Observable<string[]>;
  topicsList: string[] = [];
  listOfAllTopics: string[] = [];

  autocompleteConfig = {
    visible: true,
    selectable: true,
    removable: true,
    addOnBlur: true,
    submitted: false,
  };

  @ViewChild('vacancyInput') vacancyInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('filterForm') createNew: NgForm;

  filterForm = new FormGroup({
    title: new FormControl(),
    type: new FormControl(),
    topics: new FormControl(),
  });

  title$ = this.filterForm.get('title').valueChanges.pipe(
    startWith(''),
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  type$ = this.filterForm.get('type').valueChanges.pipe(
    startWith(''),
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  topics$ = this.filterForm.get('topics').valueChanges.pipe(
    startWith(''),
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  get topics(): AbstractControl {
    return this.filterForm.get('topics');
  }

  ngOnInit() {
    this.searchValues();
    this.questionFacade.getTopics();
    this.topicsSubscription = this.store.select(fromSelector.selectTopics).subscribe((topics) => {
      this.listOfAllTopics = topics;
    });
  }

  searchValues(): void {
    this.searchFieldsSubscription = combineLatest(this.title$, this.type$, this.topics$).subscribe(
      ([title, type, topics]) => {
        this.httpRequest.questionsParams['title'] = title;
        this.httpRequest.questionsParams['type'] = type;
        this.httpRequest.questionsParams['topics'] = topics;
        this.httpRequest.questionsParams['skip'] = 0;

        this.store.dispatch(new fromActions.GetSortedQuestions(this.httpRequest.questionsParams));
      }
    );
  }

  add({ input, value }: MatChipInputEvent): void {
    // Add topic only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      // Add our topic
      if ((value || '').trim()) {
        this.topicsList.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove(vacancy: string): void {
    const index = this.topicsList.indexOf(vacancy);

    if (index >= 0) {
      this.topicsList.splice(index, TM_VALIDATION_FORM_VALUES.removeVacancyCount);
    }
    this.topics.setValue(this.topicsList.join());
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.topicsList.push(event.option.viewValue);
    this.vacancyInput.nativeElement.value = '';
    this.topics.setValue(this.topicsList.join());
  }

  filterVacancies(): void {
    this.filteredTopics = this.topics.valueChanges.pipe(
      startWith(null),
      map((vacancy: string | null) => (vacancy ? this._filter(vacancy) : this.listOfAllTopics.slice()))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfAllTopics.filter((vacancy) => vacancy.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy() {
    this.httpRequest.questionsParams = {
      skip: 0,
      limit: 10,
    };
    this.topicsSubscription.unsubscribe();
    this.searchFieldsSubscription.unsubscribe();
  }
}
