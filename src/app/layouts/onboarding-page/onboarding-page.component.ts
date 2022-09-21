import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/interfaces';

@Component({
  selector: 'app-onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.css'],
})
export class OnboardingPageComponent implements OnInit {
  products!: Products;

  constructor() {}

  ngOnInit(): void {}
}
