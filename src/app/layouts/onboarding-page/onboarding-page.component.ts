import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/interfaces';
import { GetProductService } from 'src/app/services/get-product.service';

@Component({
  selector: 'app-onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.css']
})

export class OnboardingPageComponent implements OnInit {
  constructor() { }


  ngOnInit(): void {
  }

}
