import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  cart = new BehaviorSubject([
    // { id: null, qty: null},
  ]);

  allCartIds = new BehaviorSubject([]);

  cart_total_size = new BehaviorSubject(null);


  loginValidation = new BehaviorSubject({
    canLogin: false,
    admin: false
  });


  constructor(private _http: HttpClient) { }

  updateCartItemToSession(product_id) {
    console.log('dataService > addCartItemToSession > product_id => ', product_id);
    return this._http.post('/api/session/updateCartItemToSession', product_id);
  }




  getData() {
    // this._http.get('/data')
    // .subscrice(
    //   (data) => {
    //     this.cart = data;
    //   }
    // )
  }

} // -- EOF
