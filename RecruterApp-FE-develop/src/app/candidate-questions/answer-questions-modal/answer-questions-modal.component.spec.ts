import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuestionsModalComponent } from './answer-questions-modal.component';

describe('AnswerQuestionsModalComponent', () => {
  let component: AnswerQuestionsModalComponent;
  let fixture: ComponentFixture<AnswerQuestionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerQuestionsModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerQuestionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
