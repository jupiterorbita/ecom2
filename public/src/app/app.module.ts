import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeddyComponent } from './teddy/teddy.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ProductService } from './product.service';
import { DataService } from './data.service';
import { CartComponent } from './cart/cart.component';
import { ProductsdashComponent } from './productsdash/productsdash.component';
import { UsersdashComponent } from './usersdash/usersdash.component';
import { AdminheadComponent } from './adminhead/adminhead.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    TeddyComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    AdmindashComponent,
    AddproductComponent,
    EditproductComponent,
    CartComponent,
    ProductsdashComponent,
    UsersdashComponent,
    AdminheadComponent,
    CheckoutComponent,
    UserprofileComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, ProductService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
