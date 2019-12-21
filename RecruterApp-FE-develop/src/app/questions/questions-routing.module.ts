import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { QuestionsLibraryComponent } from './questions-library/questions-library.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    children: [
      {
        path: '',
        component: QuestionsLibraryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
