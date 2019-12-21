import { TestBed } from '@angular/core/testing';

import { MostRecentEvaluationsService } from './most-recent-evaluations.service';

describe('MostRecentEvaluationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MostRecentEvaluationsService = TestBed.get(MostRecentEvaluationsService);
    expect(service).toBeTruthy();
  });
});
