import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { QuestionsLibraryComponent } from './questions-library/questions-library.component';
import { QuestionsDialogComponent } from '../shared/question-dialog/question-dialog.component';
import { MaterialModule } from '../material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterSettingsComponent } from './questions-library/filter-settings/filter-settings.component';
import { QuestionsListComponent } from './questions-library/questions-list/questions-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [QuestionsComponent, QuestionsLibraryComponent, FilterSettingsComponent, QuestionsListComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    InfiniteScrollModule,
    EffectsModule.forFeature([]),
    SharedModule,
  ],
  entryComponents: [QuestionsDialogComponent],
})
export class QuestionsModule {}
