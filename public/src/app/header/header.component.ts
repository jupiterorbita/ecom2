import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public sessionExists: boolean;
  public whatisssession: any;

  public newUrl: string;
  public loginValidation: any;

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _router: Router
  ) {
    this._dataService.loginValidation.subscribe((service_login) => {
      this.loginValidation = service_login;
    });
  }

  ngOnInit() {
    this.sessionExists = false;
    this.whatisssession = {};
    this.checkSession();
  }


  checkSession() {
    console.log('00000000000');
    console.log('ngOnInit check login user id');
    this._userService.checkSession()
    .subscribe((res) => {
      console.log('res =>', res);
      if (res['continue'] === true ) {
        console.log('-=-==-=--=-=-=', res);
        this.whatisssession = res;
        this.sessionExists = true;
      } else { return; }
    });
  }

  destroySession() {
    console.log('destroySession() pressed');
    this._userService.destroySession()
    .subscribe((res: any) => {
      console.log('res -> destroy session = ', res);
      this.sessionExists = false;

      this.loginValidation['canLogin'] = false;
      this.loginValidation['admin'] = false;
      this._dataService.loginValidation.next(this.loginValidation);

      // on logout perform a FULL reload
      this.newUrl = '/';
      window.location.href = this.newUrl;
      this.checkSession();

      // location.reload(true);
      this._router.navigate(['/']);
    });
  }

  superAdmin() {
    // send req to store session and make admin for demo purposes
    this._userService.makeAdmin().subscribe(res => {
      if (res['powerLevel'] > 9000 && res['canLogin'] === true ) {
        console.log('%cyou are now Chuck Norris', 'color: lightgreen');

        this.loginValidation['canLogin'] = true;
        this.loginValidation['admin'] = true;
        this._dataService.loginValidation.next(this.loginValidation);
        this.checkSession();
        this._router.navigate(['admindash']);
      }
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


}
