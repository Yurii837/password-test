import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './Modules/material.module';
import { PasswordInputComponent } from './Components/password-input/password-input.component';
import { PasswordIndicatorsComponent } from './Components/password-indicators/password-indicators.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordInputComponent,
    PasswordIndicatorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
