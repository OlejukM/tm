import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

import { MostRecentEvaluationsService } from './most-recent-evaluations.service';
import { startWith } from 'rxjs/operators';
import { ApplicationsFacade } from './store/applications.facade';
import { Subscription } from 'rxjs';
import { ApplicationParams } from './application-params';

@Component({
  selector: 'tm-most-recent-evaluations',
  templateUrl: './most-recent-evaluations.component.html',
  styleUrls: ['./most-recent-evaluations.component.scss'],
})
export class MostRecentEvaluationsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) matSort: MatSort;
  displayedColumns = this.mostRecentEvaluations.displayedColumns;
  dataSource$ = this.applicationsFacade.dataSource$;
  scoreSubscription: Subscription;

  constructor(
    private mostRecentEvaluations: MostRecentEvaluationsService,
    private applicationsFacade: ApplicationsFacade
  ) {}

  ngOnInit() {
    this.applicationsFacade.getApplications(this.mostRecentEvaluations.applicationParams);
  }

  ngAfterViewInit() {
    this.scoreSubscription = this.matSort.sortChange
      .pipe(
        startWith({
          active: 'score',
          direction: 'asc',
        })
      )
      .subscribe((sort) => {
        const params: ApplicationParams = {
          sortBy: sort.active,
          order: sort.direction,
        };
        this.mostRecentEvaluations.updateParams(params);
        this.applicationsFacade.getApplications(this.mostRecentEvaluations.applicationParams);
      });
  }

  ngOnDestroy() {
    this.scoreSubscription.unsubscribe();
  }
}
