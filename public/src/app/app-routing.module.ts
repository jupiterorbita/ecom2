import { EditproductComponent } from './editproduct/editproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: '/main'},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'admindash', component: AdmindashComponent},
  {path: 'addproduct', component: AddproductComponent},
  {path: 'editproduct/:product_id', component: EditproductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
