
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppreciationComponent } from './layouts/appreciation/appreciation.component';
import { OnboardingPageComponent } from './layouts/onboarding-page/onboarding-page.component';
import { SurveyComponent } from './layouts/survey/survey.component';

const routes: Routes = [
  { path: '', component: OnboardingPageComponent },
  { path: 'survey', component:SurveyComponent },
  { path: 'appreciation', component:AppreciationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
