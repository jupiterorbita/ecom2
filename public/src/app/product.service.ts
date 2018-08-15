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


// FETCH ALL - GET INVENTORY
  getInventory() {
    console.log('productService > getInventory');
    return this._http.get('/api/product/getInventory');
  }






// ============= ORDERING ===============

  // ------------ ID ▲ ASCENDING -------------
  id_asc() {
    console.log('userService > id_asc()');
    return this._http.get('/api/product/id_asc');
  }
  // ------------ ID ▼ DESCENDING -----------
  id_desc() {
    console.log('userService > id_desc()');
    return this._http.get('/api/product/id_desc');
  }

  // ------------ PRICE ▲ ASC --------------
  price_asc() {
    console.log('userService > price_asc()');
    return this._http.get('/api/product/price_asc');
  }
  // ------------ PRICE ▼ DESC --------------
  price_desc() {
    console.log('userService > price_desc()');
    return this._http.get('/api/product/price_desc');
  }

  // ------------ QTY ▲ ASC --------------
  qty_asc() {
    console.log('userService > qty_asc()');
    return this._http.get('/api/product/qty_asc');
  }
  // ------------ QTY ▼ DESC --------------
  qty_desc() {
    console.log('userService > qty_desc()');
    return this._http.get('/api/product/qty_desc');
  }









  // ------------ NAME ▲ ASCENDING -------------
  name_asc() {
    console.log('userService > name_asc()');
    return this._http.get('/api/product/name_asc');
  }




} // -- EOF
