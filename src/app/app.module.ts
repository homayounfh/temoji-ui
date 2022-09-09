import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { OnboardingPageComponent } from './layouts/onboarding-page/onboarding-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { SurveyComponent } from './layouts/survey/survey.component';


@NgModule({
  declarations: [
    AppComponent,
    OnboardingPageComponent,
    SurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PickerModule,
    EmojiModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
