import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MatAutocompleteModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/shared.module';
import { reducers, CustomSerializer } from './store';
import { environment } from '../environments/environment';
import { QuestionEffects } from './questions/store/question.effects';
import { AuthGuardService } from './auth/auth-guard.service';
import { SignInEffects } from './store/sign-in.effects';
import { AuthModule } from './auth/auth.module';
import { ApplicationsEffects } from './most-recent-evaluations/store/applications.effects';
import { CandidateApplicationEffects } from './candidate-questions/store/candidate-application.effects';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ApplicationSubmitComponent } from './application-submit/application-submit.component';

@NgModule({
  declarations: [AppComponent, UserComponent, NotFoundPageComponent, ApplicationSubmitComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 5, logOnly: environment.production }),
    EffectsModule.forRoot([QuestionEffects, SignInEffects, ApplicationsEffects, CandidateApplicationEffects]),
    AuthModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
