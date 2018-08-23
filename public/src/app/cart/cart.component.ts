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
  finalCartTotal;
  public confirmClearCart: boolean;
  cart_total_size: any;
  serverCartService;
  confirmZeroCart: boolean;

  constructor(
    private _dataService: DataService,
    private _productService: ProductService,
    private _router: Router
  ) {
    this._dataService.cart.subscribe((service_cart) => {
      this.cart = service_cart;
      this.cart_total_size = this.countCartItems(); // everytime a change in cart update
      console.log('cart_total_size CONSTRUCTOR >', this.cart_total_size);
      console.log('service cart is =>', this.cart);
    });
    this._dataService.cart_total_size.subscribe((service_cart_size) => {
      this.cart_total_size = service_cart_size;
    });
    this._dataService.serverCartService.subscribe((service_serverCart) => {
      this.serverCartService = service_serverCart;
    });
  }

  ngOnInit() {
    this.cartProducts = [];
    this.getAllCartProducts();
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

  getAllCartProducts() {
    console.log('getAllCartProducts');
    this._productService.getAllCartItems()
    .subscribe((res: any) => {
      console.log('did we get all the carts items?', res);

      if (res['message'] === 'nothing in cart') {
        console.log('no products in cart');
        return;
      } else if (res['message'] === 'found items') {
        this._dataService.serverCartService.next(res['totalItemsBack']);


        // TO DO HERE =-=-=-=--=-=--=
        console.log('###### res["totalItemsBack"] =>', res['totalItemsBack']);
        // this.cartProducts = res['totalItemsBack'];
        this.cartProducts = this.serverCartService;

        console.log('##### this.cartProducts =>', this.cartProducts);
        this._dataService.serverCartService.next(res['totalItemsBack']);



        this.finalCartTotal = res['finalCartTotal'];
        console.log('##### this.finalCartTotal =>', this.finalCartTotal);
      }
    });
  }

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
      this._dataService.serverCartService.next(this.cart); // <---- ????

      console.log('BEFORE getAllCartProducts() >>>>>>> cart is cleared WHat is cartProducts?', this.cartProducts);

      this.cart_total_size = 0;
      this._dataService.cart_total_size.next(this.cart_total_size);

      // once the cart is empty GET ALL CART ITEMS AGAIN (EMPTY)
      this.getAllCartProducts();
      console.log('AFTER getAllCartProducts() >>>>>>> cart is cleared WHat is cartProducts?', this.cartProducts);

      alert('CART is now empty!!!!');
      this._router.navigate(['/']);
    }
    return;
  }

// ----------- QTY change -------------
  plusQty(item_id) {
    console.log('clicked minusQty with itemid=', item_id);
    // adding to existing cart
    for (let idx = 0; idx < this.cart.length; idx++) {
      if (this.serverCartService[idx].id === item_id) {
        // update cart QTY
        this.serverCartService[idx].qty++;
        // then update the cart service
        this._dataService.cart.next(this.serverCartService);

        // go and update the cart session > SERVER
        // this._dataService.updateCartItemToSession({cart: this.cart})

        this._dataService.updateCartItemToSession({ cart: this.serverCartService})
        .subscribe(server_res => {
          console.log('-- updated cart ------', server_res);

          // once in session go back to server and calc the totals
          this.getAllCartProducts();
        });
        return;
      }
    }
  }


  /// TO DO
  // when going back to products to add 1 ADDITIONAL item with qty 1
  // you come back to cart to delete that 1 new item added with qty 1
  // err is that it displays name undefined on th confirm delete
  minusQty(item_id) {
    console.log('clicked plusQty with itemid=', item_id);
    for (let idx = 0; idx < this.cart.length; idx++) {
      if (this.cart[idx].id === item_id) {
        // update cart QTY
        if (this.cart[idx].qty > 1) {
          this.cart[idx].qty--;
          // then update the cart service
          this._dataService.cart.next(this.cart);

          // go and update the cart session > SERVER
        // this._dataService.updateCartItemToSession({cart: this.cart})

        this._dataService.updateCartItemToSession({ cart: this.cart})
        .subscribe(server_res => {
          console.log('-- updated cart ------', server_res);
          // once in session go back to server and calc the totals
          this.getAllCartProducts();
        });
      } else if (this.cart[idx].qty === 1) {
        console.log(`qty of item ${this.cart[idx].product_name} === 0 !!`);
        this.confirmZeroCart = confirm(`are you sure you want to remove ${this.cart[idx].product_name} from the cart?`);
        if (this.confirmZeroCart === true) {
          console.log('user said yes to remove item from cart id=>', this.cart[idx].id);
          // remove this product id from session and update cart
          // .....
          this._productService.removeItemFromCartSession(this.cart[idx].id)
          .subscribe((res: any) => {
            console.log('%cremove LAST item from cart res["updatedCart"]=> ', 'color: red', res['updatedCart']);
            // once the item is removed from session update the cart
            this._dataService.cart.next(res['updatedCart']);

            this.getAllCartProducts();
          });
        }

      }

        return;
      }
    }
  }




} // -- EOF
