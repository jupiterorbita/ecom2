import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  public allUsers: {};
  public allFormattedDates: {};
  public sessionExists: boolean;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    console.log('=== MAIN.COMPONENT.TS LOADED ===');
    this.fetchAllUsers();
    // this.sessionExists = false;
    this.checkSession();
  }

  checkSession() {
    // console.log('ngOnInit check login user id');
    this._userService.checkSession()
    .subscribe((res) => {
      // console.log('res =>', res);
      if (res['continue'] === true ) {
        this.sessionExists = true;
      } else { return; }
    });
  }

  destroySession() {
    // console.log('destroySession() pressed');
    this._userService.destroySession()
    .subscribe((res: any) => {
      // console.log('res -> destroy session = ', res);
      this.sessionExists = false;
    });
  }



  goToProducts() {
    this._userService.checkSession()
    .subscribe((res) => {
      // console.log('res =>', res);
      if (res['continue'] === true ) {
        // console.log('TRUE');
        this._router.navigate(['products']);
      } else {
        // console.log('FALSE');
        return; }
    });
  }


  goToAdminDash() {
    this._userService.checkIfAdmin()
    .subscribe((res) => {
        // console.log('admin? res=>', res);
        if (res['powerLevel'] > 9000) {
          // console.log('OVER 9000 !!!!!');
          this._router.navigate(['admindash']);
        } else {
          // console.log('YOU HAVE NO POWER HERE!');
          return;
        }
      });
  }



  fetchAllUsers() {
    // console.log('%c fetching all users', 'color: yellow');
    this._userService.fetchAllUsers().subscribe(res => {
      this.allUsers = res['result'];
      // console.log('server res=>', res);

      // console.log('%c SQL - DATES =>', 'color: lightgreen', res['result'][0]['date_created']);
      // console.log(res['results'][0].name);
    });
  }





} // -- EOF
