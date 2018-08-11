import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: {};

  constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.loginUser = {
      email: '',
      pass: ''
    };
  }


  login() {
    this.checkUser(this.loginUser);
  }

  checkUser(potentialUser: any) {
    console.log('***********', potentialUser);
    this._userService.checkUser(potentialUser)
    .subscribe((res: any) => {
      console.log('%cback from server with res =>', 'color: yellow', res);
      console.log(res.message);
      if (res.canLogin === true) {
        console.log('email ok proceed to check pass');
        
      } else if (res['canLogin'] === false) {
        console.log('no match email - DO NOT PROCCEED');
      }
    });
  }

}
