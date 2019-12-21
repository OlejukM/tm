import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateApplicationService } from './candidate-application.service';

@Component({
  selector: 'tm-candidate-questions',
  templateUrl: './candidate-questions.component.html',
})
export class CandidateQuestionsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private candidateApplicationService: CandidateApplicationService) {}

  ngOnInit() {
    this.candidateApplicationService.setApplicationId(this.route.snapshot.params.id);
  }
}
