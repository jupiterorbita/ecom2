import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-usersdash',
  templateUrl: './usersdash.component.html',
  styleUrls: ['./usersdash.component.css']
})
export class UsersdashComponent implements OnInit {


  public allUsers: {};
  public allFormattedDates: {};
  public sessionExists: boolean;


  constructor(
    // private _dataService: DataService,
    private _userService: UserService,
    private _router: Router
  ) { }

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
    });
  }


  superAdmin() {
    // send req to store session and make admin for demo purposes
    this._userService.makeAdmin().subscribe(res => {
      if (res['powerLevel'] > 9000 && res['canLogin'] === true ) {
        console.log('%cyou are now Chuck Norris', 'color: lightgreen');
        this._router.navigate(['admindash']);
      }
    });
  }



} // -- EOF
