import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  allUsers: {};
  allFormattedDates: {};

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.fetchAllUsers();
  }



  fetchAllUsers() {
    console.log('%c fetching all users', 'color: yellow');
    this._userService.fetchAllUsers().subscribe(res => {
      this.allUsers = res['result'];
      console.log('server res=>', res);

      // console.log('%c SQL - DATES =>', 'color: lightgreen', res['result'][0]['date_created']);
      // console.log(res['results'][0].name);
    });
  }

}
