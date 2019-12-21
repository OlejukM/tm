import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacanciesComponent } from './vacancies.component';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { VacancyItemComponent } from './vacancy-item/vacancy-item.component';
import { VacancyCreateComponent } from './vacancy-create/vacancy-create.component';

const routes: Routes = [
  {
    path: '',
    component: VacanciesComponent,
    children: [
      {
        path: '',
        component: VacanciesListComponent,
      },
      {
        path: 'create',
        component: VacancyCreateComponent,
      },
      {
        path: 'edit/:id',
        component: VacancyCreateComponent,
      },
      {
        path: ':id/applications',
        component: VacancyItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacanciesRoutingModule {}
