import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VacancyItemFacade } from './store/vacancy-item.facade';
import { Application } from './application';
import { VacanciesFacade } from '../store/vacancies.facade';
import { Vacancy } from '../vacancy';
import { InviteCandidateModalComponent } from 'src/app/shared/invite-candidate-modal/invite-candidate-modal.component';
import { Statistic } from './store/vacancy-item.action';

export interface Reviewer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApplicationsByVacancy {
  id: string;
  candidate: Application;
  status: string;
  score: number;
  reviewer: Reviewer;
  invited: string;
}

@Component({
  selector: 'tm-vacancy-item',
  templateUrl: './vacancy-item.component.html',
  styleUrls: ['./vacancy-item.component.scss'],
})
export class VacancyItemComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  dataSource$: Observable<Application[]> = this.vacancyItemFacade.applications$;
  totalLength$: Observable<number> = this.vacancyItemFacade.totalLength$;
  selectedVacancy$: Observable<Vacancy> = this.vacanciesFacade.editVacancy$;
  statistic$: Observable<Statistic> = this.vacancyItemFacade.statistic$;
  selectedVacancy: Vacancy;
  selectedVacancySubscription: Subscription;
  applicationId: string;
  statistic: Statistic;
  statisticSubscription: Subscription;
  tableSortSubscription: Subscription;
  dTime = 200;
  one = 1;

  defaultParams = {
    skip: 1,
    limit: 10,
  };

  statusCheck = {
    invited: 'status-container-invited',
    started: 'status-container-started',
    evaluated: 'status-container-evaluated',
    completed: 'status-container-completed',
  };

  displayedColumns: string[] = ['candidate', 'status', 'score', 'reviewer', 'invited'];

  constructor(
    private route: ActivatedRoute,
    private vacancyItemFacade: VacancyItemFacade,
    private vacanciesFacade: VacanciesFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.applicationId = this.route.snapshot.params.id;
    this.vacanciesFacade.fetchVacancyById(this.applicationId);
    this.vacancyItemFacade.getStatistic(this.applicationId);
    this.selectedVacancySubscription = this.selectedVacancy$.subscribe((res) => (this.selectedVacancy = res));
    this.statisticSubscription = this.statistic$.subscribe((res) => (this.statistic = res));
  }

  ngAfterViewInit() {
    this.tableSort();
  }

  ngOnDestroy() {
    this.vacanciesFacade.removeEditedVacancy();
    this.selectedVacancySubscription.unsubscribe();
    this.statisticSubscription.unsubscribe();
    this.tableSortSubscription.unsubscribe();
  }

  tableSort(): void {
    this.tableSortSubscription = combineLatest(
      this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 10 })),
      this.matSort.sortChange.pipe(startWith({ active: 'status', direction: 'asc' }))
    )
      .pipe(
        debounceTime(this.dTime),
        distinctUntilChanged()
      )
      .subscribe(([page, sort]) => {
        const params = {
          skip: page.pageIndex + this.one,
          limit: page.pageSize,
          sortBy: sort.active,
          order: sort.direction,
        };

        this.vacancyItemFacade.loadApplications(params, this.applicationId);
      });
  }

  onInvite(): void {
    this.dialog.open(InviteCandidateModalComponent);
  }
}
