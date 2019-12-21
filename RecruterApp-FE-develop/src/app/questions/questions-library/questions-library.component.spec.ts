import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsLibraryComponent } from './questions-library.component';

describe('QuestionsLibraryComponent', () => {
  let component: QuestionsLibraryComponent;
  let fixture: ComponentFixture<QuestionsLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsLibraryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
