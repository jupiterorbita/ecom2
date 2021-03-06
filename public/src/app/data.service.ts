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

  serverCartService = new BehaviorSubject([]);

  loginValidation = new BehaviorSubject({
    canLogin: false,
    admin: false
  });

  whereAmIComingFrom = new BehaviorSubject({
    from: 'nothing',
    cart_size: null
  });

  userName = new BehaviorSubject('');
  user = new BehaviorSubject({
    id: null,
    fname: ''
  });



  constructor(private _http: HttpClient) { }

  updateCartItemToSession(cart) {
    console.log('dataService > addCartItemToSession(cart) > cart => ', cart);
    return this._http.post('/api/session/updateCartItemToSession', cart);
  }

  clearCartSession() {
    console.log('dataService > clearCartSession() >> going to SERVER ');
    return this._http.get('/api/product/clearCartSession');
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
