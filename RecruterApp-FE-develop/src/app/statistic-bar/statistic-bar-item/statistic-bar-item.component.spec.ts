import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBarItemComponent } from './statistic-bar-item.component';

describe('StatisticBarItemComponent', () => {
  let component: StatisticBarItemComponent;
  let fixture: ComponentFixture<StatisticBarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticBarItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
