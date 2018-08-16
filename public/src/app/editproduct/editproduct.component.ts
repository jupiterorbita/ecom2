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
  prod_id: any;
  confirmEdit: boolean;
  confirmReset: boolean;
  // create all fields seperate bc as obj it binds them to the same mem loc
  tempProductName = '';
  tempProductDesc = '';
  tempSku = null;
  tempQty = null;
  tempProductPrice = null;
  tempImg = '';
  tempColor = '';

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
      this.prod_id = params['product_id'];
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

      // set default values for reset
      this.tempProductName = res['res'].product_name;
      this.tempProductDesc = res['res'].product_description;
      this.tempSku = res['res'].sku;
      this.tempQty = res['res'].qty;
      this.tempProductPrice = res['res'].product_price;
      this.tempImg = res['res'].img;
      this.tempColor = res['res'].color;
    });
  }

  submitEditedProductForm() {
    console.log('new edited obj =>', this.editProduct);
    this.confirmEdit = confirm(`Edit  ${this.tempProductName}  this? \n asdsad`);
    if (this.confirmEdit === true) {
      this._productService.saveEditedProduct(this.prod_id, this.editProduct)
      .subscribe(res => {
        console.log('submitted product res =>', res);
        alert(`product edited and saved successfully!\n WOOHOO!`);
        this._router.navigate(['/admindash']);

      });
    } else { return; }
  }




  resetToOriginalFields() {
    this.confirmReset = confirm('Are you sure you want to reset to defaults?');
    if (this.confirmReset === true) {
      this.editProduct['product_name'] = this.tempProductName;
      this.editProduct['product_description'] = this.tempProductDesc;
      this.editProduct['sku'] = this.tempSku;
      this.editProduct['qty'] = this.tempQty;
      this.editProduct['product_price'] = this.tempProductPrice;
      this.editProduct['img'] = this.tempImg;
      this.editProduct['color'] = this.tempColor;
    } else { return; }
  }












} // -- EOF
