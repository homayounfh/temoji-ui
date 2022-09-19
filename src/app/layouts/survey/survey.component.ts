import { SurveyRequestItem } from './../../models/interfaces';
import { Component, HostListener, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Products, SurveyRequest } from 'src/app/models/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { SurveyService } from 'src/app/services/survey.service';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  text: string = '';
  products!: Products;
  currentProductIndex: number = 0;
  selectedEmojies: Array<string> = [];
  currentSelectedEmojies: Array<string> = [];
  currentSelectedEmojiesState: Array<number> = [];
  surveyId = uuidv4();
  recommendedEmojies: string[] = [];
  isEmojiToggled: boolean = false;
  selectedEmojiesAnimation: boolean = false;

  toggled: boolean = false;

  constructor(
    private _products: ProductService,
    private _survey: SurveyService,
    private _snackBar: MatSnackBar,
  ) {}

  isCorrectApply(e: string) {
    var isCorrect = true;
    this.currentSelectedEmojies.forEach((emoji) => {
      if (emoji == e) isCorrect = false;
    });

    return isCorrect;
  }

  ngOnInit(): void {
    this._products.getProducts().subscribe((data) => {
      this.products = data;
      for (let i = 0; i < this.products.products.length; i++) {
        this.selectedEmojies.push('');
        this.recommendedEmojies =
          this.products.products[i].recommendedEmojies.split(',');
      }
    });
  }
  next() {
    if (this.currentProductIndex <= this.products!.products.length) {
      this.currentProductIndex += 1;
      if (this.selectedEmojies[this.currentProductIndex] != '') {
        this.currentSelectedEmojies =
          this.selectedEmojies[this.currentProductIndex].split(',');
      } else {
        this.currentSelectedEmojies = [];
      }
    }
  }

  clearAnimationStates() {
    for (let i = 0; i < this.currentSelectedEmojies.length; i++) {
      this.currentSelectedEmojiesState[i] = 0;
    }
  }

  animate(i: number) {
    this.currentSelectedEmojiesState[i] = 1;
    setTimeout(() => {
      this.currentSelectedEmojiesState[i] = 0;
    }, 820);
  }

  previous() {
    if (this.currentProductIndex > 0) {
      this.currentProductIndex -= 1;
      if (this.selectedEmojies[this.currentProductIndex] != '') {
        this.currentSelectedEmojies =
          this.selectedEmojies[this.currentProductIndex].split(',');
      } else {
        this.currentSelectedEmojies = [];
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
      sri.selectedEmojies = this.selectedEmojies[i];
      items.push(sri);
    }

    this._survey.submitSurvey(surveyRequest).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        if(e.status == 400) {
          this.openSnackBar('Bad Request!')
        } 
        if(e.status == 500) {
          this.openSnackBar('Internal Server Error')
        }
      },
      complete: () => console.info('complete') 
  });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });

  }

  addEmoji(e: string) {
    if (!this.isCorrectApply(e)) {
      for (let i = 0; i < this.recommendedEmojies.length; i++) {
        if (this.recommendedEmojies[i] == e) {
          this.animate(i);
          break;
        }
      }
      return;
    }
    if (this.currentSelectedEmojies.length < 7) {
      this.currentSelectedEmojies.push(e);
    } 
    this.selectedEmojies[this.currentProductIndex] =
      this.currentSelectedEmojies.join(',');
    // run animation
    this.selectedEmojiesAnimation = true;
    setTimeout(() => {
      this.selectedEmojiesAnimation = false;
    }, 400);
  }

  deleteEmoji(emojiIndex: number) {
    let _selectedEmojies =
      this.selectedEmojies[this.currentProductIndex].split(',');
    _selectedEmojies.splice(emojiIndex, 1);
    this.selectedEmojies[this.currentProductIndex] = _selectedEmojies.join(',');
    this.currentSelectedEmojies = _selectedEmojies;
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
