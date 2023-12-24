import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from './shared/shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { MsgDialogComponent } from './shared/msg-dialog/msg-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatTooltipModule} from '@angular/material/tooltip';
import { LoggingInterceptor } from './services/logging.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    ProfileComponent,
    MsgDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
