import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public newUser: {};
  public loginValidation: any;

  whereAmIComingFrom: {};

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
      this._dataService.whereAmIComingFrom.subscribe((service_comingFrom) => {
        this.whereAmIComingFrom = service_comingFrom;
      });
    }

  ngOnInit() {
    this.newUser = {
      fname: '',
      lname: '',
      email: '',
      pass: '',
      pass2: '',
      created_at: '',
      updated_at: '',
      admin: 0
    };
    console.log('REGISTER COMPONENT > whereAmIComingFrom =>', this.whereAmIComingFrom);
  }

// ======= submit form - CREATE USER =====
  submitNewUser(newFormUser) {
    console.log('%c newFormUser =>', 'color: blue', newFormUser);
    this.newUser = newFormUser.value;
    console.log('%c - this.newUser =>', 'color: yellow', this.newUser);
    console.log(`%c - this.newUser => ${JSON.stringify(this.newUser)}`, 'color: yellow');

    console.log('-----------');
    console.log(this.newUser['pass']);
    console.log(this.newUser['pass2']);


  // --------- FORM VALIDATORS -----------
    // FIRST name Validation
    if (this.newUser['fname'].length < 3 || this.newUser['fname'].length > 15 ) {
      console.log('First name must be 3-15 letters');
      alert('First name must be 3-15 letters');
      return;
    }
    // LAST name Validation
    if (this.newUser['lname'].length < 3 || this.newUser['lname'].length > 20 ) {
      console.log('Last name must be 3-20 letters');
      alert('Last name must be 3-20 letters');
      return;
    }
    if (this.newUser['pass'].length < 3 || this.newUser['pass'].length > 50 ) {
      console.log('Password must be 3-50 characters');
      alert('Password must be 3-50 characters');
      return;
    }

    if (this.newUser['pass'] === this.newUser['pass2']) {
      this._userService.createUser(this.newUser)
      .subscribe((res: any) => {
          console.log('res from newUser save res =>', res);
          console.log('res from newUser save res.success =>', res.success);
          if (res.success === true) {
            console.log('result is valid -> routing back to app.component');
            this.loginValidation['canLogin'] = true;
            this.loginValidation['admin'] = false;
            this._dataService.loginValidation.next(this.loginValidation);

            // check to see if they came from cart to register
            if (this.whereAmIComingFrom['from'] === 'cart') {
              console.log('user came from cart, then registered successfuly now go to cart again');
              console.log('whereAmIComingFrom =>', this.whereAmIComingFrom);
              this._router.navigate(['cart']);
            }
            this._router.navigate(['products']);
          } else {
            console.log('invalid result - server error not saved');
          }
        });
      } else {
        console.log('pass doesn\'t match');
        alert('pass doent match');
        return;
      }

  }





} // -- EOF
