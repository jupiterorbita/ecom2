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

  public confirmClearCart: boolean;
  public confirmLogoutAlert: boolean;

  public newUrl: string;
  public loginValidation: any;

  cart: any;
  cart_total_size: any;

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _router: Router
  ) {
    this._dataService.loginValidation.subscribe((service_login) => {
      this.loginValidation = service_login;
    });
    this._dataService.cart.subscribe((service_cart) => {
      this.cart = service_cart;
      this.cart_total_size = this.countCartItems(); // everytime a change in cart update
      console.log('cart_total_size CONSTRUCTOR >', this.cart_total_size);
    });
    this._dataService.cart_total_size.subscribe((service_cart_size) => {
      this.cart_total_size = service_cart_size;
    });
  }

  ngOnInit() {
    this.sessionExists = false;
    this.whatisssession = {};
    this.checkSession();
  }

  countCartItems() {
    this.cart_total_size = 0;
    for (let idx = 0; idx < this.cart.length; idx++) {
      console.log('idx => ', idx);
      console.log('%c this.cart[idx]', 'color:yellow', this.cart[idx]);
      console.log('this.cart[idx]["qty"] =>', this.cart[idx]['qty']);
      this.cart_total_size += this.cart[idx]['qty'];
      this._dataService.cart_total_size.next(this.cart_total_size);

      console.log('cart_total_size =>', this.cart_total_size);
    }
    return this.cart_total_size;
    }
    // this.cart_total_size = Object.keys(this.cart).length;


  clearCart() {
    console.log('### about to clear CART ###');
    this.confirmClearCart = confirm(`CLEAR CART? with ${this.cart_total_size} items ?`);
    if (this.confirmClearCart === true) {
      for (let idx = this.cart.length; idx > 0; idx--) {
        this.cart.pop();
      }
      // this.cart = [];
      // go and CLEAR cart from SESSION!!!
      this._dataService.clearCartSession().subscribe((res) => {
        console.log('is cart cleared? res =>', res);
      });
      console.log('IS THE CART EMPTY? =>', this.cart);
      this._dataService.cart.next(this.cart);
      alert('CART is now empty!!!!');
    }
    return;
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

    if (this.cart_total_size > 0) {
      console.log('%c=== this.cart.length =>', 'color: blue', this.cart_total_size);
      this.confirmLogoutAlert = confirm(`Are you sure you want to logout?\nthis will force refresh the page to clear all session data!\nyou will also lose ${this.cart_total_size} item(s) in your CART! :(`);
    }
    if (!this.cart_total_size) {
      this.confirmLogoutAlert = confirm('Are you sure you want to logout?\nthis will force refresh the page to clear all session data!');
    }
    if (this.confirmLogoutAlert === true) {

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

    } else { return; }
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
        alert('You are now Chuck Norris');
      }
    });
  }


  goToCart() {
    this._router.navigate(['cart']);
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


} // -- EOF
