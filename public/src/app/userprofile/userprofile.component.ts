import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user;

  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.checkWhoThisUserIs();
    // init defaults so the callback can fill them
    this.user = {
      userfname: '',
      userlname: '',
      useremail: ''
    };
  }

  checkWhoThisUserIs() {
    // get this user from req.session.userid & req.session.fname
    console.log('userprofile component > checkUser()');
    this._userService.checkWhoThisUserIs().subscribe((res: any) => {
      this.user = res['user'];
      console.log(res);
      console.log('this.user =>', this.user);
    });
  }

  // we have access to
  // req.session.userid = result[0].id;
  // req.session.fname = result[0].fname;













}
