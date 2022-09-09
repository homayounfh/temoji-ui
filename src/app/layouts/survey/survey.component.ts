import { Component, OnInit } from '@angular/core';
import { Product, ProductResponse } from 'src/app/models/interfaces';
import { GetProductService } from 'src/app/services/get-product.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  products!: ProductResponse;
  currentProductIndex:  number = 0;

  constructor(private _products: GetProductService) { }

  ngOnInit(): void {
    this._products.getProducts().subscribe(data => {
      this.products = data.products;
      console.log(this.products);
    })

  }

  loadNext() {
    this.currentProductIndex += 1;
  }




}
