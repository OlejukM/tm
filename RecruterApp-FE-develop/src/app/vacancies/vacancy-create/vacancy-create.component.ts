import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterReducerState } from '@ngrx/router-store';

import { CreateVacancyService } from './create-vacancy.service';
import { VacanciesFacade } from '../store/vacancies.facade';
import { Vacancy, VacancyUpdate } from '../vacancy';
import { Question } from 'src/app/questions/question';
import { mergeMap, map, filter } from 'rxjs/operators';
import { QuestionsFacade } from 'src/app/questions/store/question.facade';
import { Subscription, Observable } from 'rxjs';
import { RouterFacade } from 'src/app/store/router.facade';
import { RouterStateUrl } from 'src/app/store';

export interface VacancyForm {
  title: string;
  type: string;
  description: string;
  author: string;
  link: string;
  status?: any;
  questions: Question[];
}

@Component({
  selector: 'tm-vacancy-create',
  templateUrl: './vacancy-create.component.html',
  styleUrls: ['./vacancy-create.component.scss'],
})
export class VacancyCreateComponent implements OnInit, OnDestroy {
  router$: Observable<RouterReducerState<RouterStateUrl>> = this.mainFacade.router$;
  editVacancy$: Observable<Vacancy> = this.vacancyFacade.editVacancy$;
  editVacancySubscription: Subscription;
  vacancy: FormGroup;
  title = 'Create';
  create = true;
  id: string;

  constructor(
    private createVacancyService: CreateVacancyService,
    private vacancyFacade: VacanciesFacade,
    private questionFacade: QuestionsFacade,
    private mainFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.questionFacade.getTopics();
    this.createVacancyService.createForm();
    this.vacancy = this.createVacancyService.vacancy;
    this.editVacancySubscription = this.checkEditMode().subscribe();
  }

  ngOnDestroy() {
    this.vacancyFacade.removeEditedVacancy();
    this.createVacancyService.removeEditQuestions();
    this.editVacancySubscription.unsubscribe();
  }

  checkEditMode(): Observable<Vacancy> {
    return this.editVacancy$.pipe(
      mergeMap((vacancy) => {
        return this.router$.pipe(
          map((router) => {
            const id = router.state.params.id;
            if (vacancy) {
              this.setEditedVacancy(vacancy);

              return vacancy;
            } else if (!vacancy && id) {
              this.vacancyFacade.fetchVacancyById(id);
            }
          })
        );
      }),
      filter((vacancy) => !!vacancy)
    );
  }

  setEditedVacancy(vacancy: Vacancy): void {
    this.title = 'Edit';
    this.create = false;
    this.prefilled(vacancy);
  }

  onSubmit({ value }: { value: VacancyForm }): void {
    const status: string = value.status ? 'active' : 'on hold';
    const editQuestions: string[] = this.createVacancyService.editQuestions.map((question: Question) => question.id);
    const questions: string[] = this.create ? this.createVacancyService.questions : editQuestions;

    const vacancy = {
      ...value,
      questions,
      status,
    };

    this.updateCreateVacancy(vacancy);
  }

  updateCreateVacancy(vacancy: VacancyUpdate): void {
    if (this.create) {
      this.vacancyFacade.createVacancy(vacancy);
    } else {
      this.vacancyFacade.updateVacancy({ id: this.id, changes: vacancy });
    }
  }

  prefilled(data: Vacancy): void {
    const { title, type, description, status, link = '' } = data;

    this.id = data.id;
    this.createVacancyService.vacancy.setValue({
      title,
      type,
      description,
      link,
      status,
    });
  }
}
