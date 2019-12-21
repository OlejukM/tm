import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateQuestionsListComponent } from './candidate-questions-list.component';

describe('CandidateQuestionsListComponent', () => {
  let component: CandidateQuestionsListComponent;
  let fixture: ComponentFixture<CandidateQuestionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateQuestionsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
