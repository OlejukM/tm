import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CandidateApplicationFacade } from '../../store/candidate-application.facade';
import { CompletedQuestion } from './completed-question';
import { CandidateApplicationService } from '../../candidate-application.service';

@Component({
  selector: 'tm-information-bar-item',
  templateUrl: './information-bar-item.component.html',
  styleUrls: ['./information-bar-item.component.scss'],
})
export class InformationBarItemComponent {
  @Input() data: CompletedQuestion;

  canSubmitQuestions$ = this.candidateApplicationFacade.canSubmitFormSelector$;

  constructor(
    private candidateApplicationFacade: CandidateApplicationFacade,
    private candidateApplicationService: CandidateApplicationService,
    private router: Router
  ) {}

  submitApplication(): void {
    this.candidateApplicationService.submitApplication({ time: Date.now() }).subscribe(() => {
      this.router.navigateByUrl('/submit');
    });
  }
}
