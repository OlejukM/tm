import { Component, Input } from '@angular/core';

@Component({
  selector: 'tm-statistic-bar-item',
  templateUrl: './statistic-bar-item.component.html',
  styleUrls: ['./statistic-bar-item.component.scss'],
})
export class StatisticBarItemComponent {
  @Input() statistic;
}
