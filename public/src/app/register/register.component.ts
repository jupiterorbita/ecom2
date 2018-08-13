import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: {};

  constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newUser = {
      fname: '',
      lname: '',
      email: '',
      pass: '',
      pass2: '',
      created_at: '',
      updated_at: '',
      admin: ''
    };
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

    if (this.newUser['pass'] === this.newUser['pass2']) {
      this._userService.createUser(this.newUser)
      .subscribe((res: any) => {
          console.log('res from newUser save res =>', res);
          console.log('res from newUser save res.result =>', res.result);
          if (res.result) {
            console.log('result is valid -> routing back to app.component');
            this._router.navigate(['/']);
          } else {
            console.log('invalid result - server error not saved');
          }
        });
      } else {
        console.log('pass doesn\'t match');
        alert('pass doent match');
      }

  }





}
