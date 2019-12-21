import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MatAutocompleteModule } from '@angular/material';

import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';
import { VacancyItemComponent } from './vacancy-item/vacancy-item.component';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';

import { MaterialModule } from '../material';
import { VacanciesEffects } from './store/vacancies.effects';
import { VacancyCreateComponent } from './vacancy-create/vacancy-create.component';
import { VacancyFormComponent } from './vacancy-create/vacancy-form/vacancy-form.component';
import { TaskQuestionsComponent } from './vacancy-create/task-questions/task-questions.component';
import { LibraryQuestionsComponent } from './vacancy-create/library-questions/library-questions.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { QuestionsDialogComponent } from '../shared/question-dialog/question-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { VacancyItemEffects } from './vacancy-item/store/vacancy-item.effects';
import { StatusComponent } from './vacancy-item/status/status.component';
import { InviteCandidateModalComponent } from '../shared/invite-candidate-modal/invite-candidate-modal.component';

@NgModule({
  declarations: [
    VacanciesComponent,
    VacanciesListComponent,
    VacancyItemComponent,
    VacancyCreateComponent,
    VacancyFormComponent,
    TaskQuestionsComponent,
    LibraryQuestionsComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    VacanciesRoutingModule,
    MaterialModule,
    EffectsModule.forFeature([VacanciesEffects, VacancyItemEffects]),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatAutocompleteModule,
    SharedModule,
  ],
  exports: [InviteCandidateModalComponent],
  entryComponents: [QuestionsDialogComponent, InviteCandidateModalComponent],
})
export class VacanciesModule {}
