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

  // -------- table ordering ---------
  orderById_var;
  orderByFName_var;
  orderByLName_var;
  orderByEmail_var;
  orderByCreated_var;
  orderByUpdated_var;

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
    // -------- table ordering ---------
    this.orderById_var = 'asc';
    this.orderByFName_var = 'asc';
    this.orderByLName_var = 'asc';
    this.orderByEmail_var = 'asc';
    this.orderByCreated_var = 'asc';
    this.orderByUpdated_var = 'asc';
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







  // =====================================================
  // =============== USERS TABLE ordering ================
  // =====================================================

  // --------------- ORDER BY ID -----------------
  orderById() {
    console.log('orderById');
    // check to see what condition the orderby is
    if (this.orderById_var === 'asc') {
      console.log('orderById_var => asc ; changing it to DESC and going to get results as DESC');
      this.orderById_var = 'desc';
      // go to db and search by DESC
      this._userService.id_desc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    } else if (this.orderById_var === 'desc') {
      console.log('orderById_var => desc ; changing it to ASC and going to get results as ASC');
      this.orderById_var = 'asc';
      // go to db and search by ASC
      this._userService.id_asc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    }
  }
  // --------------- ORDER BY FNAME -----------------
  orderByFName() {
    console.log('orderByFName()');
    // check to see what condition the orderby is
    if (this.orderByFName_var === 'asc') {
      console.log('orderByFName_var => asc ; changing it to DESC and going to get results as DESC');
      this.orderByFName_var = 'desc';
      // go to db and search by DESC
      this._userService.fname_desc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    } else if (this.orderByFName_var === 'desc') {
      console.log('orderByFName_var => desc ; changing it to ASC and going to get results as ASC');
      this.orderByFName_var = 'asc';
      // go to db and search by ASC
      this._userService.fname_asc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    }
  }
  // --------------- ORDER BY LNAME -----------------
  orderByLName() {
    console.log('orderByLName()');
    // check to see what condition the orderby is
    if (this.orderByLName_var === 'asc') {
      console.log('orderByLName_var => asc ; changing it to DESC and going to get results as DESC');
      this.orderByLName_var = 'desc';
      // go to db and search by DESC
      this._userService.lname_desc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    } else if (this.orderByLName_var === 'desc') {
      console.log('orderByLName_var => desc ; changing it to ASC and going to get results as ASC');
      this.orderByLName_var = 'asc';
      // go to db and search by ASC
      this._userService.lname_asc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    }
  }
  // --------------- ORDER BY EMAIL -----------------
  orderByEmail() {
    console.log('orderByEmail()');
    // check to see what condition the orderby is
    if (this.orderByEmail_var === 'asc') {
      console.log('orderByEmail_var => asc ; changing it to DESC and going to get results as DESC');
      this.orderByEmail_var = 'desc';
      // go to db and search by DESC
      this._userService.email_desc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    } else if (this.orderByEmail_var === 'desc') {
      console.log('orderByEmail_var => desc ; changing it to ASC and going to get results as ASC');
      this.orderByEmail_var = 'asc';
      // go to db and search by ASC
      this._userService.email_asc().subscribe(res => {
        this.allUsers = res['order_results'];
      });
    }
  }
  // --------------- ORDER BY created -----------------
  orderByCreated() {
    console.log('orderByCreated()');
    // check to see what condition the orderby is
    if (this.orderByCreated_var === 'asc') {
      console.log('orderByCreated_var => asc ; changing it to DESC and going to get results as DESC');
      this.orderByCreated_var = 'desc';
      // go to db and search by DESC
      this._userService.created_desc().subscribe(res => {
        console.log(res['order_results']);
        this.allUsers = res['order_results'];
      });
    } else if (this.orderByCreated_var === 'desc') {
      console.log('orderByCreated_var => desc ; changing it to ASC and going to get results as ASC');
      this.orderByCreated_var = 'asc';
      // go to db and search by ASC
      this._userService.created_asc().subscribe(res => {
        console.log(res['order_results']);
        this.allUsers = res['order_results'];
      });
    }
  }
  // --------------- ORDER BY updated -----------------
  orderByUpdated() {
    console.log('orderByUpdated()');
    // check to see what condition the orderby is
    if (this.orderByUpdated_var === 'asc') {
      console.log('orderByUpdated_var => asc ; changing it to DESC and going to get results as DESC');
      this.orderByUpdated_var = 'desc';
      // go to db and search by DESC
      this._userService.updated_desc().subscribe(res => {
        console.log(res['order_results']);
        this.allUsers = res['order_results'];
      });
    } else if (this.orderByUpdated_var === 'desc') {
      console.log('orderByUpdated_var => desc ; changing it to ASC and going to get results as ASC');
      this.orderByUpdated_var = 'asc';
      // go to db and search by ASC
      this._userService.updated_asc().subscribe(res => {
        console.log(res['order_results']);
        this.allUsers = res['order_results'];
      });
    }
  }

} // -- EOF
