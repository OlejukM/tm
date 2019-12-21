import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { QuestionsHttpRequestsService } from '../../questions/questions-http-requests.service';
import { TM_VALIDATORS } from '../../../app/validators';
import { TM_VALIDATION_FORM_VALUES } from '../../../app/validation-form-values';
import { QuestionsState } from '../../questions/store/questions.reducer';
import * as fromActions from '../../questions/store/question.actions';
import * as fromSelector from '../../questions/store/questions.selector';
import { Question } from '../../questions/question';

@Component({
  selector: 'tm-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss'],
})
export class QuestionsDialogComponent implements OnInit, OnDestroy {
  manageQuestionForm: FormGroup;
  topicsCtrl = new FormControl();
  topicsList: Subscription;
  topicsSubscription: Subscription;
  filteredTopics$: Observable<string[]>;
  vacancies: string[] = [];
  allVacancies: string[] = [];
  dialogTitle = 'New Questions';
  dialogButton = 'CREATE';

  autocompleteConfig = {
    visible: true,
    selectable: true,
    removable: true,
    addOnBlur: true,
    submitted: false,
  };

  @ViewChild('vacancyInput') vacancyInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('createQuery') createNew: NgForm;

  constructor(
    private questionsCreate: QuestionsHttpRequestsService,
    private formBuilder: FormBuilder,
    private store: Store<QuestionsState>,
    @Inject(MAT_DIALOG_DATA) public data?: { question: Question }
  ) {}

  ngOnInit() {
    this.createForm();

    if (this.data) {
      this.prefilled();
      this.vacancies = this.data.question.topics;
      this.dialogTitle = 'Edit Question';
      this.dialogButton = 'SAVE';
    }

    this.topicsList = this.store.select(fromSelector.selectTopics).subscribe((topics) => {
      this.allVacancies = topics;
    });

    this.initFilterTopics();
  }

  private createForm() {
    this.manageQuestionForm = this.formBuilder.group({
      title: ['', TM_VALIDATORS.questionTitle],
      description: ['', TM_VALIDATORS.questionDescription],
      topics: ['', TM_VALIDATORS.questionTopics],
      type: ['text', TM_VALIDATORS.questionType],
      duration: [''],
    });
    this.topicsSubscription = this.store.select(fromSelector.selectTopics).subscribe((topics) => {
      this.allVacancies = topics;
    });

    this.initFilterTopics();
  }

  prefilled(): void {
    const { title, description, topics, type, duration } = this.data.question;

    this.manageQuestionForm.setValue({
      title,
      description,
      topics,
      type,
      duration,
    });
  }

  get title() {
    return this.manageQuestionForm.get('title');
  }

  get description() {
    return this.manageQuestionForm.get('description');
  }

  get topics() {
    return this.manageQuestionForm.get('topics');
  }

  get type() {
    return this.manageQuestionForm.get('type');
  }

  onSubmit(): void {
    this.autocompleteConfig.submitted = true;
  }

  manageQuestion(): void {
    this.manageQuestionForm.value.topics = this.vacancies;
    if (this.data) {
      this.manageQuestionForm.value.topics = this.vacancies;
      const { id } = this.data.question;
      this.store.dispatch(new fromActions.UpdateQuestion({ id, changes: this.manageQuestionForm.value }));
    } else {
      this.store.dispatch(new fromActions.CreateQuestion(this.manageQuestionForm.value));
    }
  }

  add({ input, value }: MatChipInputEvent): void {
    // Add topic only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      // Add our topic
      if ((value || '').trim()) {
        this.vacancies.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.topicsCtrl.setValue(null);
    }
  }

  remove(vacancy: string): void {
    const index = this.vacancies.indexOf(vacancy);

    if (index >= 0) {
      this.vacancies.splice(index, TM_VALIDATION_FORM_VALUES.removeVacancyCount);
    }

    const valueToSet = this.vacancies.length ? this.vacancies : null;
    this.topics.setValue(valueToSet);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.vacancies.push(event.option.viewValue);
    this.vacancyInput.nativeElement.value = '';
    this.topicsCtrl.setValue(null);
    this.topics.setValue(this.vacancies);
  }

  initFilterTopics(): void {
    this.filteredTopics$ = this.topicsCtrl.valueChanges.pipe(
      startWith(null),
      map((vacancy: string | null) => (vacancy ? this._filter(vacancy) : this.allVacancies.slice()))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allVacancies.filter((vacancy) => vacancy.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy(): void {
    this.topicsSubscription.unsubscribe();
  }
}
