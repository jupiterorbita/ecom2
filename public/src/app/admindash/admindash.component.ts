import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getInventory();
  }


// --------- get all products -----------
  getInventory() {
    this._productService().subscribe(res => {
        
    }
    })
  }











} // -- EOF
