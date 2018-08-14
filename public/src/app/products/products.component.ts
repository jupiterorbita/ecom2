import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.checkSession();
  }


  checkSession() {
    console.log('ngOnInit check login user id');
    this._userService.checkSession()
    .subscribe((res) => {
      console.log('res =>', res);
      if (res['continue'] === true ) {
        return;
      } else {
        this._router.navigate(['main']);
      }
    });
  }







}
