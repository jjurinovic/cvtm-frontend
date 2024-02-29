import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './state/auth/auth.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { reducers } from './state/state';
import { CompanyEffects } from './features/company/state/company.effects';
import { metaReducers } from './state/meta.reducers';
import { UserEffects } from './features/users/state/user.effects';
import { ProfileComponent } from './general/profile/profile.component';
import { PasswordChangeDialogComponent } from './general/password-change-dialog/password-change-dialog.component';
import { TimeTrackingEffects } from './features/time-tracking/state/time-tracking.effects';

@NgModule({
  declarations: [AppComponent, ProfileComponent, PasswordChangeDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      CompanyEffects,
      UserEffects,
      TimeTrackingEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    CoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
