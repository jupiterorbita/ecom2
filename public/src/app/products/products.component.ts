import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allProducts: {};
  sql_value_str = '';
  searchResultsFound = null;
  cart: any;

  constructor(
    private _dataService: DataService,
    private _productService: ProductService,
    private _userService: UserService,
    private _router: Router) {
      this._dataService.cart.subscribe((service_cart) => {
        this.cart = service_cart;
      });
    }

  ngOnInit() {
    // this.checkSession();
    this.getInventory();
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
        this.cart[idx].qty++;
        this._dataService.cart.next(this.cart);
        return;
      }
    }
    this.cart.push({id: product_id, qty: 1});
    this._dataService.cart.next(this.cart);
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

// ============ ORDERING =============

  // ----------- order by PRICE  -----------=
  price_asc() {
    console.log('ORDER BY PRICE ▲ ASC');
    this._productService.price_asc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }
  price_desc() {
    console.log('ORDER BY PRICE ▼ DESC');
    this._productService.price_desc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }

  // ----------- order by NAME  -----------=
  name_asc() {
    console.log('ORDER BY name ▲ ASC');
    this._productService.name_asc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }
  name_desc() {
    console.log('ORDER BY name ▼ DESC');
    this._productService.name_desc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }


  // checkSession() {
  //   console.log('ngOnInit check login user id');
  //   this._userService.checkSession()
  //   .subscribe((res) => {
  //     console.log('res =>', res);
  //     if (res['continue'] === true ) {
  //       return;
  //     } else {
  //       this._router.navigate(['main']);
  //     }
  //   });
  // }



}
