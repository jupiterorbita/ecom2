import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: any;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.newUser = {
      fname: '',
      lname: '',
      email: '',
      pass: ''
    };
  }

// ======= submit form - CREATE USER =====
  submitNewUser() {
    this._userService.createUser(this.newUser)
    .subscribe((res: any) => {
        console.log('res from newUser save =>', res);
      });
  }








}
