import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShellComponent } from './shared/shell/shell.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { CandidateAuthGuard } from './auth/candidate-auth.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ApplicationSubmitComponent } from './application-submit/application-submit.component';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'log-in/candidate/:id',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'submit',
    component: ApplicationSubmitComponent,
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard, CandidateAuthGuard],
    children: [
      {
        path: '',
        loadChildren: './homepage/homepage.module#HomepageModule',
      },
      {
        path: 'vacancies',
        loadChildren: './vacancies/vacancies.module#VacanciesModule',
      },
      {
        path: 'questions',
        loadChildren: './questions/questions.module#QuestionsModule',
      },
      {
        path: 'system-settings',
        loadChildren: './system-settings/system-settings.module#SystemSettingsModule',
      },
      {
        path: 'applications/:id',
        loadChildren: './candidate-questions/candidate-application.module#CandidateApplicationModule',
      },
      { path: '', redirectTo: 'vacancies', pathMatch: 'full' },
      { path: '**', component: NotFoundPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
