import { SurveyRequestItem } from './../../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Products, SurveyRequest } from 'src/app/models/interfaces';
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
  currentSelectedEmojies: Array<string> = [];
  surveyId = uuidv4();
  recommendedEmojies: string[] = [];


  constructor(private _products: ProductService) { }

  ngOnInit(): void {
    this._products.getProducts().subscribe((data) => {
      this.products = data;
      for (let i = 0; i < this.products.products.length; i++) {
        this.selectedEmojies.push('');
        this.recommendedEmojies = this.products.products[i].recommendedEmojies.split(",")
      }
    });
  }
  next() {
    if (this.currentProductIndex <= this.products!.products.length) {
      this.currentProductIndex += 1;
      if (this.selectedEmojies[this.currentProductIndex] != '') {
        this.currentSelectedEmojies = this.selectedEmojies[this.currentProductIndex].split(",");
      }
      else { this.currentSelectedEmojies = [] };
    }
  }
  previous() {
    if (this.currentProductIndex > 0) {
      this.currentProductIndex -= 1;
      if (this.selectedEmojies[this.currentProductIndex] != '') {
        this.currentSelectedEmojies = this.selectedEmojies[this.currentProductIndex].split(",");
      }
      else { this.currentSelectedEmojies = [] };
    }
  }
  submit() {
    let surveyRequest = {} as SurveyRequest;
    surveyRequest.surveyId = this.surveyId;
    let items = [] as SurveyRequestItem[];
    for (let i = 0; i < this.products!.products.length; i++) {
      let sri = {} as SurveyRequestItem;
      sri.productId = this.products!.products[i].id;
      sri.selectedEmojies = this.selectedEmojies[i];
      items.push(sri);
    }
  }

  addEmoji(elem: string) {
    this.currentSelectedEmojies.push(elem);
    this.selectedEmojies[this.currentProductIndex] = this.currentSelectedEmojies.join(',');
    console.log(this.selectedEmojies);
    console.log(this.currentSelectedEmojies);
  }

  deleteEmoji(emoji: string) {
    
  }
}
