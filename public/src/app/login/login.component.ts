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

  // checkIfAdmin() {
  //   this._userService.checkIfAdmin()
  //   .subscribe((res: any) => {
  //     console.log('%cis this admin? =>', 'color: lightred', res);
  //   });
  // }

  goToAdmin() {
    // this.checkIfAdmin();
    this._router.navigate(['admindash']);
    // .then(nav => {
    //   console.log('nav success?', nav); // true if nav is successful
    // }, err => {
    //   console.log('nav success?', err); // when there is an error
    // });
  }

  goToProducts() {
    this._router.navigate(['products']);
    // .then(nav => {
    //   console.log('nav success?', nav); // true if nav is successful
    // }, err => {
    //   console.log('nav success?', err); // when there is an error
    // });
  }


  checkUser(potentialUser: any) {
    console.log('***********', potentialUser);
    this._userService.checkUser(potentialUser)
    .subscribe((res: any) => {
      console.log('%cback from server with res =>', 'color: yellow', res);
      console.log(res.message);
      if (res.canLogin === true) {
        if (res.powerLevel > 9000 ) {
          alert('CHUCK NORRIS logged in!');
          console.log('SUCCESS id stored in session in server, goToAdmin now');
          this.goToAdmin();
        } else {
          alert('USER logged in!');
          console.log('SUCCESS id stored in session in server, goToProducts now');
          this.goToProducts();
        }
      } else {
        alert('Sorry, cannot login');
        console.log('no match email OR pass - DO NOT PROCCEED');
        return;
      }
    });
  }






} // -- EOF

