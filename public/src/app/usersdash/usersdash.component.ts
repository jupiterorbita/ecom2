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
  sql_value_str: string; // for the search
  searchResultsFound = null;
  searchFieldValue;


  constructor(
    // private _dataService: DataService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log('=== MAIN.COMPONENT.TS LOADED ===');
    this.sql_value_str = ''; // for the search
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

  // ======== onKey event =============
  onKey(event: any) {
    // console.log('====== event =>', event);
    // console.log('====== event.target =>', event.target);
    console.log('====== event.target.value =>', event.target.value);
    this.sql_value_str = event.target.value;
    console.log('this.sql_value_str', this.sql_value_str);
    if (this.sql_value_str.length > 0) {
      this._userService.sendSearchStr(this.sql_value_str)
      .subscribe(server_res => {
        console.log('server_res =>', server_res);
        console.log('server_res["found"] =>', server_res['found']);
        if (server_res['found'] === true) {
          this.allUsers = server_res['res'];
          console.log('search results found from DB:' + Object.keys(this.allUsers).length);
          this.searchResultsFound = Object.keys(this.allUsers).length;
          console.log('%c all products =>', 'color: yellow', this.allUsers);
        } else {
          console.log('not found');
          this.searchResultsFound = 0;
          // this.getInventory();
        }
      });
    } else {
      this.fetchAllUsers();
      this.searchResultsFound = null;
    }
  }
  // ----- clear search str --------
  clearSearchStr() {
    console.log('pressed clearSearchStr() >');
    this.sql_value_str = '';
    this.searchResultsFound = 0;
    this.fetchAllUsers();
    // get focus on the input field again
    document.getElementById('searchbox').focus();
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
