import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  allProducts: {};

  // deleteMessage: string;
  confirmDelete: boolean;

  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {
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


// ---------- DELETE 🛑 product --------
  deleteProduct(product_id, name) {
    console.log('DELETING product with id=>', product_id);
    this.confirmDelete = confirm(`are you sure you want to DELETE 🛑  "${name}" 🛑  ?`);
    if (this.confirmDelete === true) {
      this._productService.deleteProduct(product_id).subscribe(res => {
        console.log('did we delete the product?');
        this.getInventory();
        alert(`product deleted`);
      });
    } else {
      // this.deleteMessage = 'You pressed Cancel!';
      return;
    }
    console.log('DELETING product with id=>', product_id);
  }



// ------------ EDIT button => GO TO EDIT COMPONENT ==========
  editProduct(product_id) {
    console.log('EDIT product with id=> ', product_id);
    this._router.navigate(['editproduct/' + product_id ]);
  }











































// ============ ORDERING =============
  // ----------- order by ID  -----------=
  id_asc() {
    console.log('ORDER BY ID ▲ ASCENDING');
    this._productService.id_asc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }
  id_desc() {
    console.log('ORDER BY ID ▼ DESCENDING');
    this._productService.id_desc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }

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

  // ----------- order by QTY ------------
  qty_asc() {
    console.log('ORDER BY QTY ▲ ASC');
    this._productService.qty_asc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }
  qty_desc() {
    console.log('ORDER BY QTY ▼ DESC');
    this._productService.qty_desc().subscribe(res => {
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
    this._productService.name_asc().subscribe(res => {
      this.allProducts = res['order_results'];
    });
  }







} // -- EOF
