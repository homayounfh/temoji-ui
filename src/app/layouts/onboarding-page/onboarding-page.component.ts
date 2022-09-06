import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/interfaces';
import { GetProductService } from 'src/app/services/get-product.service';

@Component({
  selector: 'app-onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.css']
})
export class OnboardingPageComponent implements OnInit {
  products!: Products;

  constructor(private _products: GetProductService) { }

  ngOnInit(): void {
    this._products.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
      
    })
  }

}
