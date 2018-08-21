import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  cart = new BehaviorSubject([
    // { id: null, qty: null},
  ]);

  cart_total_size = new BehaviorSubject(null);


  loginValidation = new BehaviorSubject({
    canLogin: false,
    admin: false
  });


  constructor() { }

  getData() {
    // this._http.get('/data')
    // .subscrice(
    //   (data) => {
    //     this.cart = data;
    //   }
    // )
  }

} // -- EOF
