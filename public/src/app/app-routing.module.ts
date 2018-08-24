import { EditproductComponent } from './editproduct/editproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
// import { ProductsdashComponent } from './productsdash/productsdash.component';
import { UsersdashComponent } from './usersdash/usersdash.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: '/main'},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'admindash', component: AdmindashComponent},
  {path: 'addproduct', component: AddproductComponent},
  {path: 'editproduct/:product_id', component: EditproductComponent},
  {path: 'cart', component: CartComponent},
  // {path: 'admindash/productsdash', component: ProductsdashComponent},
  {path: 'admindash/usersdash', component: UsersdashComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'userprofile', component: UserprofileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
