import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { StatisticBarComponent } from '../statistic-bar/statistic-bar.component';
import { StatisticBarItemComponent } from '../statistic-bar/statistic-bar-item/statistic-bar-item.component';
import { MostRecentEvaluationsComponent } from '../most-recent-evaluations/most-recent-evaluations.component';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [HomepageComponent, StatisticBarComponent, StatisticBarItemComponent, MostRecentEvaluationsComponent],
  imports: [CommonModule, HomepageRoutingModule, MaterialModule],
})
export class HomepageModule {}
