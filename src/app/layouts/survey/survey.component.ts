import { SurveyRequestItem } from './../../models/interfaces';
import { Component, HostListener, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Products, SurveyRequest } from 'src/app/models/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { SurveyService } from 'src/app/services/survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  text: string = '';
  products!: Products;
  currentProductIndex: number = 0;
  selectedEmojis: Array<string> = [];
  currentSelectedEmojis: Array<string> = [];
  currentSelectedEmojisState: Array<number> = [];
  surveyId = uuidv4();
  recomendedEmojis: string[] = [];
  isEmojiToggled: boolean = false;
  selectedEmojisAnimation: boolean = false;
  isLoading: boolean = true;
  toggled: boolean = false;

  constructor(
    private _products: ProductService,
    private _survey: SurveyService,
    private _snackBar: MatSnackBar,
    private _route: Router
  ) {}

  isCorrectApply(e: string) {
    var isCorrect = true;
    this.currentSelectedEmojis.forEach((emoji) => {
      if (emoji == e) isCorrect = false;
    });

    return isCorrect;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._products.getProducts().subscribe({
      next: (v) => {
        this.products = v;
        if ((this.products.products.length as number) != 0) {
          this.recomendedEmojis =
            this.products.products[0].recomendedEmojis.split(',');
        }
        for (let i = 0; i < this.products.products.length; i++) {
          this.selectedEmojis.push('');
        }
      },
      error: (e) => {
        this.isLoading = false;
        if (e.status == 500) {
          this.openSnackBar('Internal Server Error');
        }
      },
      complete: () => (this.isLoading = false),
    });
  }
  next() {
    if (this.currentProductIndex <= this.products!.products.length) {
      this.currentProductIndex += 1;
      this.recomendedEmojis =
        this.products.products[this.currentProductIndex].recomendedEmojis.split(
          ','
        );
      if (this.selectedEmojis[this.currentProductIndex] != '') {
        this.currentSelectedEmojis =
          this.selectedEmojis[this.currentProductIndex].split(',');
      } else {
        this.currentSelectedEmojis = [];
      }
    }
  }

  clearAnimationStates() {
    for (let i = 0; i < this.currentSelectedEmojis.length; i++) {
      this.currentSelectedEmojisState[i] = 0;
    }
  }

  animate(i: number) {
    this.currentSelectedEmojisState[i] = 1;
    setTimeout(() => {
      this.currentSelectedEmojisState[i] = 0;
    }, 820);
  }

  previous() {
    if (this.currentProductIndex > 0) {
      this.currentProductIndex -= 1;
      this.recomendedEmojis =
        this.products.products[this.currentProductIndex].recomendedEmojis.split(
          ','
        );
      if (this.selectedEmojis[this.currentProductIndex] != '') {
        this.currentSelectedEmojis =
          this.selectedEmojis[this.currentProductIndex].split(',');
      } else {
        this.currentSelectedEmojis = [];
      }
    }
  }

  submit() {
    let surveyRequest = {} as SurveyRequest;
    surveyRequest.surveyId = this.surveyId;
    let items = [] as SurveyRequestItem[];
    for (let i = 0; i < this.products!.products.length; i++) {
      let sri = {} as SurveyRequestItem;
      sri.productId = this.products!.products[i].id;
      sri.selectedEmojis = this.selectedEmojis[i];
      items.push(sri);
    }
    surveyRequest._items = items;
    this._survey.submitSurvey(surveyRequest).subscribe({
      next: (v) => {
        this._route.navigate(['appreciation']);
      },
      error: (e) => {
        if (e.status == 400) {
          this.openSnackBar('Bad Request!');
        }
        if (e.status == 500) {
          this.openSnackBar('Internal Server Error');
        }
      },
      complete: () => console.info('complete'),
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  addEmoji(e: string) {
    if (!this.isCorrectApply(e)) {
      for (let i = 0; i < this.recomendedEmojis.length; i++) {
        if (this.recomendedEmojis[i] == e) {
          this.animate(i);
          break;
        }
      }
      return;
    }
    if (this.currentSelectedEmojis.length < 7) {
      this.currentSelectedEmojis.push(e);
    }
    this.selectedEmojis[this.currentProductIndex] =
      this.currentSelectedEmojis.join(',');
    // run animation
    this.selectedEmojisAnimation = true;
    setTimeout(() => {
      this.selectedEmojisAnimation = false;
    }, 400);
  }

  deleteEmoji(emojiIndex: number) {
    let _selectedEmojis =
      this.selectedEmojis[this.currentProductIndex].split(',');
    _selectedEmojis.splice(emojiIndex, 1);
    this.selectedEmojis[this.currentProductIndex] = _selectedEmojis.join(',');
    this.currentSelectedEmojis = _selectedEmojis;
  }

  addCustomEmoji(data: any) {
    console.log(data.emoji.native);
    this.isEmojiToggled = false;
    this.addEmoji(data.emoji.native);
  }

  isAddEmojiiToggled() {
    this.isEmojiToggled = true;
  }

  isBackgroundToggled() {
    this.isEmojiToggled = false;
  }
}
