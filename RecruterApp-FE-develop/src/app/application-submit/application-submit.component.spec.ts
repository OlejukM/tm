import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSubmitComponent } from './application-submit.component';

describe('ApplicationSubmitComponent', () => {
  let component: ApplicationSubmitComponent;
  let fixture: ComponentFixture<ApplicationSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSubmitComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
