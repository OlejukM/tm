import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { GoogleSigninService } from './google-signin/google-signin.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store';

@NgModule({
  declarations: [AuthComponent, GoogleSigninComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    EffectsModule.forFeature([AuthEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [GoogleSigninService],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [GoogleSigninService],
    };
  }
}
