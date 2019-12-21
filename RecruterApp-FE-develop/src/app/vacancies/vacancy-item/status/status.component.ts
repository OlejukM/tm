import { Component, OnInit, OnDestroy } from '@angular/core';

import { VacanciesFacade } from '../../store/vacancies.facade';
import { VacancyUpdate, Vacancy } from '../../vacancy';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tm-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit, OnDestroy {
  selectedVacancy: Vacancy;
  selectedVacancySubscription: Subscription;
  buttonText: string;

  constructor(private vacanciesFacade: VacanciesFacade) {}

  ngOnInit() {
    this.setSelectedVacancy();
  }

  ngOnDestroy() {
    this.selectedVacancySubscription.unsubscribe();
  }

  setStatus(): void {
    this.toggleStatus();
    this.vacanciesFacade.updateVacancy({ id: this.selectedVacancy.id, changes: this.updateVacancy() });
  }

  toggleStatus(): void {
    this.selectedVacancy.status = this.selectedVacancy.status === 'active' ? 'closed' : 'active';
  }

  toggleButton(): void {
    if (this.selectedVacancy) {
      this.buttonText = this.selectedVacancy.status === 'active' ? 'close' : 'open';
    }
  }

  setSelectedVacancy(): void {
    this.selectedVacancySubscription = this.vacanciesFacade.editVacancy$.subscribe((res) => {
      this.selectedVacancy = res;
      this.toggleButton();
    });
  }

  updateVacancy(): VacancyUpdate {
    const questions = this.selectedVacancy.questions.map((question) => question.id);

    delete this.selectedVacancy.created_at;
    delete this.selectedVacancy.id;

    return {
      ...this.selectedVacancy,
      questions,
    };
  }
}
