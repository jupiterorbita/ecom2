import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


// ---- create new user --------
  createUser(newUser: any) {
    return this._http.post('/api/new_user', newUser);
  }







}
