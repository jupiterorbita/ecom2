import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }



// CREATE new Product
  createProduct(new_product: {}) {
    console.log('productService > createProduct > => new_product = ', new_product);
    return this._http.post('/api/product/create', new_product);
  }











} // -- EOF
