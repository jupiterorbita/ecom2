import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  editProduct: {};
  tempOriginalProduct: {};

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.editProduct = {
      product_name: '',
      product_description: '',
      product_price: '',
      sku: '',
      qty: '',
      img: '',
      color: ''
    };
    console.log('>> editproduct.component > ngOnInit');
    this._route.params.subscribe((params: Params) => {
      console.log('======== params ======\n', params);
      console.log('params =>', params['product_id']);
      // go and fetch one from id param url
      this.getOneProduct(params['product_id']);
    });
  }



  getOneProduct(product_id) {
    console.log('inside fucntion getOneProduct w/ id =>', product_id);
    this._productService.getOneProduct(product_id)
    .subscribe(res => {
      console.log('onInit got back from server with res=>', res['res']);
      this.editProduct = res['res'];
      this.tempOriginalProduct = res['res'];
    });
  }

  submitEditedProductForm() {
    console.log('new edited obj =>', this.editProduct)
  }

  resetToOriginalFields() {
    this.editProduct = this.tempOriginalProduct;
  }












} // -- EOF
