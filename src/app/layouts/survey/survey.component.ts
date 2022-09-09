import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Products } from 'src/app/models/interfaces';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  products!: Products;
  currentProductIndex: number = 0;
  selectedEmojies: Array<string> = [];
  surveyId = uuidv4();

  constructor(private _products: ProductService) {}

  ngOnInit(): void {
    this._products.getProducts().subscribe((data) => {
      this.products = data;
      for (let i = 0; i < this.products.products.length; i++) {
        this.selectedEmojies.push('');
      }
    });
  }
  next() {
    if (this.currentProductIndex <= this.products.products.length)
      this.currentProductIndex += 1;
  }
  previous() {
    if (this.currentProductIndex > 0) this.currentProductIndex -= 1;
  }
}
