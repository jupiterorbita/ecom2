import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: {};
  public loginValidation: any;

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
      this._dataService.loginValidation.subscribe( (service_login) => {
        this.loginValidation = service_login;
      });
    }

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
          // change login status and update service
          this.loginValidation['canLogin'] = true;
          this.loginValidation['admin'] = true;
          this._dataService.loginValidation.next(this.loginValidation);
          this.goToAdmin();
        } else {
          alert('USER logged in!');
          console.log('SUCCESS id stored in session in server, goToProducts now');
          this.loginValidation['canLogin'] = true;
          this.loginValidation['admin'] = false;
          this._dataService.loginValidation.next(this.loginValidation);
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

