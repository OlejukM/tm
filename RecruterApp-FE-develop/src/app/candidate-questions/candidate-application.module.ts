import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CandidateQuestionsComponent } from './candidate-questions.component';
import { CandidateQuestionsListComponent } from './candidate-questions-list/candidate-questions-list.component';
import { AnswerQuestionsModalComponent } from './answer-questions-modal/answer-questions-modal.component';
import { InformationBarComponent } from './information-bar/information-bar.component';
import { InformationBarItemComponent } from './information-bar/information-bar-item/information-bar-item.component';
import { CandidateApplicationRoutingModule } from './candidate-application-routing.module';
import { MaterialModule } from '../material';
import { EffectsModule } from '@ngrx/effects';
import { VacanciesEffects } from '../vacancies/store/vacancies.effects';

@NgModule({
  declarations: [
    CandidateQuestionsComponent,
    CandidateQuestionsListComponent,
    InformationBarComponent,
    InformationBarItemComponent,
    AnswerQuestionsModalComponent,
  ],
  imports: [
    CommonModule,
    CandidateApplicationRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([VacanciesEffects]),
  ],
  entryComponents: [AnswerQuestionsModalComponent],
})
export class CandidateApplicationModule {}
