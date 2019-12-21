import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBarComponent } from './statistic-bar.component';

describe('StatisticBarComponent', () => {
  let component: StatisticBarComponent;
  let fixture: ComponentFixture<StatisticBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
