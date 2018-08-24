import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {

  }

  // we have access to
  // req.session.userid = result[0].id;
  // req.session.fname = result[0].fname;
}
