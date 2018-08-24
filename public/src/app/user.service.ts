import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

// ============== REGISTER ==============
// ---- create new user --------
  createUser(newUser: any) {
    console.log(`%c inside createUser userService >>> SERVER newUser =>`, 'color: yellow', newUser);
    return this._http.post('/api/users/new_user', newUser);
  }

// ----- fetch ALL Users -----
  fetchAllUsers() {
    console.log(`%c inside FETCH ALL userService >>> SERVER`, 'color: yellow');
    return this._http.get('/api/users/fetchAll');
  }


// ================ LOGIN ==============
// ------- check user ----------
  checkUser(potentialUser) {
    console.log(`%c inside checkUser userService >>> SERVER`, 'color: yellow', potentialUser);
    return this._http.post('/api/users/checkUser', potentialUser);
  }


// ======== check session =========
  checkSession() {
    console.log(`%c inside checkSession userService >>> SERVER`, 'color: yellow');
    return this._http.get('/api/users/checkSession');
  }


// ========== CHECK ADMIN RIGHTS ===========
  checkIfAdmin() {
    console.log('%c inside checkIfAdmin userService >>> SERVER', 'color: red');
    return this._http.get('/api/users/checkIfAdmin');
  }

// ========= MAKE ADMIN ============
// make admin
makeAdmin() {
  console.log('userService > makeAdmin() >');
  return this._http.get('/api/users/makeAdmin');
}

// ======== DESTROY SESSION =========
  destroySession() {
    console.log(`%c userService > destroySession() > SERVER`, 'color: red');
    return this._http.get('/api/users/destroySession');
  }

// ========== User Profile Check who this user is from login/reg ======
  checkWhoThisUserIs() {
    console.log(`%c userService > checkWhoThisUserIs() >> SERVER`, 'color: red');
    return this._http.get('/api/users/checkWhoThisUserIs');
  }

  // -------------search -----------
  sendSearchStr(sql_str: any) {
    console.log('userService > sendSearchStr > SQL STRING =>', sql_str);
    return this._http.get('/api/users/search/' + sql_str);
  }

// ========== ORDERING users table in admin dash =========
  // ------------ ID ▲ ASCENDING -------------
  id_asc() {
    console.log('userService > id_asc()');
    return this._http.get('/api/users/id_asc');
  }
  // ------------ ID ▼ DESCENDING -----------
  id_desc() {
    console.log('userService > id_desc()');
    return this._http.get('/api/users/id_desc');
  }
  // ------------ FNAME ▲ ASCENDING -------------
  fname_asc() {
    console.log('userService > id_asc()');
    return this._http.get('/api/users/fname_asc');
  }
  // ------------ FNAME ▼ DESCENDING -----------
  fname_desc() {
    console.log('userService > id_desc()');
    return this._http.get('/api/users/fname_desc');
  }
  // ------------ LNAME ▲ ASCENDING -------------
  lname_asc() {
    console.log('userService > id_asc()');
    return this._http.get('/api/users/lname_asc');
  }
  // ------------ LNAME ▼ DESCENDING -----------
  lname_desc() {
    console.log('userService > id_desc()');
    return this._http.get('/api/users/lname_desc');
  }

} // -- EOF
