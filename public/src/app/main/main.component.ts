import { DataService } from '../data.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cart: any;
  allProducts: {};
  randomImg: any;

  // for search
  sql_value_str = '';
  searchResultsFound = null;

  constructor(
    private _dataService: DataService,
    private _productService: ProductService,
    // private _userService: UserService,
    // private _router: Router
  ) {
    this._dataService.cart.subscribe((service_cart) => {
      this.cart = service_cart;
    });
  }

  ngOnInit() {
    console.log('=== MAIN.COMPONENT.TS LOADED ===');
    this.getInventory();
    this.getRandomImg();
  }

// ------- get a random img num to put in --------
getRandomImg() {
  this.randomImg = Math.floor(Math.random() * 11) + 1; // return a num between 1 - 11
  console.log('this.randomImg =>', this.randomImg);
}

// --------- get all products (onInit)-----------
getInventory() {
  console.log('inside > admindash.component > getInventory() ');
  this._productService.getInventory().subscribe(res => {
    console.log('SERVER came back with res =>', res);
    this.allProducts = res['sql_result'];
  });
  }


  // ========= ADD TO CART ==========
  addToCart(product_id) {
    console.log('-- clicked ADD -- with id=>', product_id);
    for (let idx = 0; idx < this.cart.length; idx++) {
      if (this.cart[idx].id === product_id) {
        // update cart QTY
        this.cart[idx].qty++;
        // then update the cart service
        this._dataService.cart.next(this.cart);

        // go and update the cart session > SERVER
        // this._dataService.updateCartItemToSession({cart: this.cart})

        this._dataService.updateCartItemToSession({ cart: this.cart})
        .subscribe(server_res => {
          console.log('-- updated cart ------', server_res);
        });
        return;
      }

    } // else...
    // push new cart item with default qty 1
    this.cart.push({id: product_id, qty: 1});
    // update again the service
    this._dataService.cart.next(this.cart);

    // go and update the cart session > SERVER
    this._dataService.updateCartItemToSession({cart: this.cart})
    .subscribe(server_res => {
      console.log('--------', server_res);
    });
    return;
  }



    // ======== onKey event SEARCH =============
    onKey(event: any) {
      // console.log('====== event =>', event);
      // console.log('====== event.target =>', event.target);
      console.log('====== event.target.value =>', event.target.value);
      this.sql_value_str = event.target.value;
      console.log('this.sql_value_str', this.sql_value_str);
      if (this.sql_value_str.length > 0) {
        this._productService.sendSearchStr(this.sql_value_str)
        .subscribe(server_res => {
          console.log('server_res =>', server_res);
          console.log('server_res["found"] =>', server_res['found']);
          if (server_res['found'] === true) {
            this.allProducts = server_res['res'];
            console.log('search results found from DB:' + Object.keys(this.allProducts).length);
            this.searchResultsFound = Object.keys(this.allProducts).length;
            console.log('%c all products =>', 'color: yellow', this.allProducts);
          } else {
            console.log('not found');
            this.searchResultsFound = 0;
            // this.getInventory();
          }
        });
      } else {
        this.getInventory();
        this.searchResultsFound = null;

      }
    }

} // -- EOF
