import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public loginValidation: {};

  constructor(
    private _dataService: DataService,
    private _router: Router
  ) {
    this._dataService.loginValidation.subscribe((service_login) => {
      this.loginValidation = service_login;
    });
  }

  ngOnInit() {
    console.log('*** INSIDE CHECKOUT COMPONENT ***');
    console.log('what is loginValidation? =>', this.loginValidation);
  }




}
