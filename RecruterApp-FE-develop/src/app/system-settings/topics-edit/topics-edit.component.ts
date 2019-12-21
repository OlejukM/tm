import { Component, Input, OnInit } from '@angular/core';
import { QuestionsFacade } from 'src/app/questions/store/question.facade';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VacanciesFacade } from 'src/app/vacancies/store/vacancies.facade';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recruiter } from '../recruiter';
import { AddRecruiter, RecruiterFacade } from '../store';

@Component({
  selector: 'tm-topics-edit',
  templateUrl: './topics-edit.component.html',
  styleUrls: ['./topics-edit.component.scss'],
})
export class TopicsEditComponent implements OnInit {
  topicsForm: FormGroup;
  data$: Observable<string[]>;
  recruiters: any[];

  constructor(
    private questionFacade: QuestionsFacade,
    private formBuilder: FormBuilder,
    private vacanciesFacade: VacanciesFacade,
    private recruiterFacade: RecruiterFacade
  ) {}

  @Input()
  mode: string;

  ngOnInit() {
    if (this.mode === 'topics') {
      this.questionFacade.getTopics();
      this.data$ = this.questionFacade.topics$;
    } else if (this.mode === 'vacancies') {
      this.vacanciesFacade.getVacanciesTypes();
      this.data$ = this.vacanciesFacade.vacanciesTypes$;
    } else if (this.mode === 'recruiters') {
      this.recruiterFacade.getRecruiters();
      this.data$ = this.recruiterFacade.allRecruiters$;
    }

    this.createForm();
  }

  private createForm(): void {
    this.topicsForm = this.formBuilder.group({
      topicTitle: [''],
    });
  }

  addTopic({ value }: { value: { topicTitle: string } }): void {
    if (this.mode === 'topics') {
      this.questionFacade.addTopic(value.topicTitle);
    } else if (this.mode === 'vacancies') {
      this.vacanciesFacade.addVacancyType(value.topicTitle);
    } else if (this.mode === 'recruiters') {
      this.recruiterFacade.addRecruiter(value.topicTitle);
    }
  }
}
