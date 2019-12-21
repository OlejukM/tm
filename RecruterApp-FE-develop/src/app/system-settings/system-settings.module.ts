import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';

import { SystemSettingsRoutingModule } from './system-settings-routing.module';
import { SystemSettingsComponent } from './system-settings.component';
import { MaterialModule } from '../material';
import { TopicsEditComponent } from './topics-edit/topics-edit.component';
import { EffectsModule } from '@ngrx/effects';
import { VacanciesEffects } from '../vacancies/store/vacancies.effects';
import { RecruitersEffects } from './store/recruiters.effect';
import { RecruitersService } from './recruiters.service';

@NgModule({
  declarations: [SystemSettingsComponent, TopicsEditComponent],
  imports: [
    CommonModule,
    SystemSettingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    EffectsModule.forFeature([VacanciesEffects, RecruitersEffects]),
  ],
  providers: [RecruitersService],
})
export class SystemSettingsModule {}
