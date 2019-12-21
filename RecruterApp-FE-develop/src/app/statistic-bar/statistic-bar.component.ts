import { Component, OnInit } from '@angular/core';

import { StatisticService } from './statistic.service';
import { map } from 'rxjs/operators';
import { Statistic } from './statistic';
import { StatisticScore } from './statistic-score';

@Component({
  selector: 'tm-statistic-bar',
  templateUrl: './statistic-bar.component.html',
  styleUrls: ['./statistic-bar.component.scss'],
})
export class StatisticBarComponent implements OnInit {
  activeVacancies: Statistic = null;
  bestScoreToday: Statistic = null;
  needReview: Statistic = null;

  constructor(private statisticService: StatisticService) {}

  ngOnInit() {
    this.statisticService
      .getStatisticScore()
      .pipe(map((res: StatisticScore) => this.mapToStatisticInfo(res)))
      .subscribe(({ activeVacancies, bestScoreToday, needReview }) => {
        this.activeVacancies = activeVacancies;
        this.bestScoreToday = bestScoreToday;
        this.needReview = needReview;
      });
  }

  mapToStatisticInfo(res: StatisticScore): { [key: string]: Statistic } {
    const { activeVacancies, bestScoreToday, needReview } = res;

    return {
      activeVacancies: {
        title: 'Active vacancies',
        number: activeVacancies,
        action: 'CREATE NEW',
      },
      needReview: {
        title: 'Applications need review',
        number: needReview,
      },
      bestScoreToday: {
        title: 'Best score today',
        number: bestScoreToday + '%',
      },
    };
  }
}
