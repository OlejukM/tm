import { Component, DoCheck, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Question } from 'src/app/questions/question';
import { DragAndDropService } from '../drag-and-drop.service';
import { CreateVacancyService } from '../create-vacancy.service';
import { TYPE_OF_ICON } from '../../../shared/constants';
import { BACKGROUND_COLOR_ICON } from '../../../shared/constants';
import { Vacancy } from '../../vacancy';
import { Subscription, Observable } from 'rxjs';
import { VacanciesFacade } from '../../store/vacancies.facade';

@Component({
  selector: 'tm-task-questions',
  templateUrl: './task-questions.component.html',
  styleUrls: ['./task-questions.component.scss'],
})
export class TaskQuestionsComponent implements DoCheck, OnInit, OnDestroy {
  TYPE_OF_ICON = TYPE_OF_ICON;
  BACKGROUND_COLOR_ICON = BACKGROUND_COLOR_ICON;

  taskQuestions: Question[] = [];
  oldValueQuestions: Question[] = [];
  totalMin = 0;
  editVacancy$: Observable<Vacancy> = this.vacancyFacade.editVacancy$;
  editVacancySubscription: Subscription;

  constructor(
    private dragDrop: DragAndDropService,
    private createVacancyService: CreateVacancyService,
    private vacancyFacade: VacanciesFacade
  ) {}

  ngOnInit() {
    this.setTaskQuestions();
  }

  ngDoCheck() {
    this.updateTaskQuestions();
  }

  ngOnDestroy() {
    this.editVacancySubscription.unsubscribe();
  }

  setTaskQuestions(): void {
    this.editVacancySubscription = this.editVacancy$.subscribe((vacancy) => {
      if (vacancy) {
        this.taskQuestions = vacancy.questions;
      }
    });
  }

  updateTaskQuestions(): void {
    if (this.oldValueQuestions !== this.taskQuestions) {
      this.createVacancyService.questions = this.taskQuestions.map((elem) => elem.id);
      this.createVacancyService.editQuestions = this.taskQuestions;
      this.totalMin = this.taskQuestions.reduce((acc, question) => acc + question.duration, 0);
    }
  }

  drop(event: CdkDragDrop<Question[]>): void {
    this.dragDrop.drop(event);
  }

  onDelete(question: Question): void {
    this.taskQuestions = this.taskQuestions.filter((taskQuestion) => taskQuestion.id !== question.id);
  }
}
