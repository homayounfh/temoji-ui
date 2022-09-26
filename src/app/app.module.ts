import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { OnboardingPageComponent } from './layouts/onboarding-page/onboarding-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SurveyComponent } from './layouts/survey/survey.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppreciationComponent } from './layouts/appreciation/appreciation.component';


@NgModule({
  declarations: [AppComponent, OnboardingPageComponent, SurveyComponent, AppreciationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PickerModule,
    EmojiModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
