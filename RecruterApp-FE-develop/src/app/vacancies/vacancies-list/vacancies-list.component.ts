import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Vacancy } from '../vacancy';
import { combineLatest, Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VacanciesFacade } from '../store/vacancies.facade';
import { HttpParamsInterface } from '../http-interface';

@Component({
  selector: 'tm-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
})
export class VacanciesListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  one = 1;
  dataSource$: Observable<Vacancy[]>;
  vacancies: Vacancy[];
  order = true;
  dTime = 200;
  totalLength$: Observable<number>;
  statusCheck = {
    active: 'status-container-active',
    closed: 'status-container-closed',
    'on hold': 'status-container-on-hold',
  };
  displayedColumns: string[] = ['vacancy', 'type', 'status', 'score', 'opened'];

  constructor(private vacanciesFacade: VacanciesFacade, private router: Router) {}

  ngAfterViewInit() {
    combineLatest(
      this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 10 })),
      this.matSort.sortChange.pipe(startWith({ active: 'title', direction: 'asc' }))
    )
      .pipe(
        debounceTime(this.dTime),
        distinctUntilChanged()
      )
      .subscribe(([page, sort]) => {
        const params: HttpParamsInterface = {
          skip: page.pageIndex + this.one,
          limit: page.pageSize,
          sortBy: sort.active,
          order: sort.direction,
        };

        this.vacanciesFacade.loadVacancies(params);
        this.dataSource$ = this.vacanciesFacade.dataSource$;
        this.totalLength$ = this.vacanciesFacade.totalLength$;
      });
  }

  onEdit(vacancy: Vacancy): void {
    this.vacanciesFacade.getEditedVacancy(vacancy);
    this.router.navigateByUrl(`vacancies/edit/${vacancy.id}`);
  }

  onDetails(id: string): void {
    this.router.navigateByUrl(`vacancies/${id}/applications`);
  }
}
