import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  newProduct: {};

  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {
    this.newProduct = {
      product_name: '',
      product_description: '',
      sku: '',
      qty: '',
      product_price: '',
      img_url: '',
      color: ''
    };
  }

  // ADD FRONT-END VALIDATIONS --- !!!

  submitNewProductForm(formProduct) {
    console.log('submitNewProductForm presses');
    this.newProduct = formProduct.value;
    this._productService.createProduct(this.newProduct)
    .subscribe((res: {}) => {
      console.log('i got back from server =>', res);
      if (res['success'] === true) {
        console.log('success create new product, now redirect');
        alert('successfully created new product');
        this._router.navigate(['admindash']);
      } else {
        alert('there was an error creating product');
      }
    });
  }















} // -- EOF
