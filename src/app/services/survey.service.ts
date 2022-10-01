import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  SurveyRequest } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private _http: HttpClient) { }

  submitSurvey(data: SurveyRequest): Observable<any> {
   return this._http.post<any>('https://temoji-api-gamenet.apps.ir-thr-at1.arvan.run/survey', data);
  }
}
