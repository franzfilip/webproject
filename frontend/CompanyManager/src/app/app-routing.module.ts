import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductsComponent } from './products/products.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserdetailComponent },
  { path: 'products/:id', component: ProductdetailComponent },
  { path: 'login', component: UserloginComponent},
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
