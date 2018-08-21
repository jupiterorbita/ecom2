import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts;
  cart;

  constructor(
    private _dataService: DataService,
    private _productService: ProductService,
    private _router: Router
  ) {
    this._dataService.cart.subscribe((service_cart) => {
      this.cart = service_cart;
      console.log('service cart is =>', this.cart);
    });
  }

  ngOnInit() {
    this.cartProducts = [];
    this.getAllCartProducts();
  }


  getAllCartProducts() {
    console.log('getAllCartProducts');
    this._productService.getAllCartItems()
    .subscribe((res: any) => {
      console.log('did we get all the carts items?', res);
      this.cartProducts = res['results'];
    });
  }
}
