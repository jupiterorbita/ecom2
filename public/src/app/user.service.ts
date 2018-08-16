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
  console.log('productService > makeAdmin >');
  return this._http.get('/api/users/makeAdmin');
}

// ======== DESTROY SESSION =========
  destroySession() {
    console.log(`%c inside destroySession userService >>> SERVER`, 'color: red');
    return this._http.get('/api/users/destroySession');
  }




} // -- EOF
