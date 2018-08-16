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

// DELETE product
  deleteProduct(product_id) {
    console.log('productService > deleteProduct > product_id =>', product_id);
    return this._http.delete('/api/product/' + product_id + '/delete');
  }

// get ONE from id param
  getOneProduct(product_id) {
    console.log('productService > getOneProduct > product_id =>', product_id);
    return this._http.get('/api/product/' + product_id + '/edit');
  }

// SAVE - EDIT product
  saveEditedProduct(product_id: any, editedProduct: any) {
    console.log('productService > saveEditedProduct > product_id =>', product_id);
    return this._http.put('/api/product/' + product_id + '/saveEdit', editedProduct);
  }


// -------------search -----------
  sendSearchStr(sql_str: any) {
    console.log('productService > sendSearchStr > SQL STRING =>', sql_str);
    return this._http.get('/api/product/search/' + sql_str);
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
  // ------------ NAME ▲ ASCENDING -------------
  name_desc() {
    console.log('userService > name_desc()');
    return this._http.get('/api/product/name_desc');
  }



} // -- EOF
