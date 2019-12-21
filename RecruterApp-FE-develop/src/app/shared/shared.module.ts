import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material';
import { QuestionsDialogComponent } from './question-dialog/question-dialog.component';
import { InviteCandidateModalComponent } from './invite-candidate-modal/invite-candidate-modal.component';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, QuestionsDialogComponent, InviteCandidateModalComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule],
  exports: [ShellComponent, HeaderComponent, QuestionsDialogComponent, RouterModule, InviteCandidateModalComponent],
  entryComponents: [InviteCandidateModalComponent],
})
export class SharedModule {}
