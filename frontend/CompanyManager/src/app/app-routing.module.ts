import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductsComponent } from './products/products.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserdetailComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductdetailComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: UserloginComponent},
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
