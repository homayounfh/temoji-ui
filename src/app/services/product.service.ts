import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Products> {
    return this._http.get<Products>('https://temoji-api-gamenet.apps.ir-thr-at1.arvan.run/products')
  }

}
