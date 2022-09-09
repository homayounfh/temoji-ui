import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductResponse } from '../models/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<ProductResponse> {
    return this._http.get<ProductResponse>(`assets/mock/products.json`)
  }

}
