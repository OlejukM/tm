import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentEvaluationsComponent } from './most-recent-evaluations.component';

describe('MostRecentEvaluationsComponent', () => {
  let component: MostRecentEvaluationsComponent;
  let fixture: ComponentFixture<MostRecentEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MostRecentEvaluationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostRecentEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
