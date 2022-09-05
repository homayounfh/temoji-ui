import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OnboardingPageComponent } from './layouts/onboarding-page/onboarding-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
