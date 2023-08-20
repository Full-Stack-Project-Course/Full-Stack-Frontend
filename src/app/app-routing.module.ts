import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {path:"" , component:HomeComponent , pathMatch:"full" , data:{breadcrumb:"Home"}},
  {path:"shop" , loadChildren:() => import("./shop/shop.module").then(m => m.ShopModule)},
  {path:"basket" , loadChildren: async () => (await import('./basket/basket.module')).BasketModule},
  {path:"checkout" , canActivate:[authGuard] , loadChildren: async () => (await import('./checkout/checkout.module')).CheckoutModule},
  {path:"account"  , loadChildren: async () => (await import('./account/account.module')).AccountModule},
  {path:"orders"  , loadChildren: async () => (await import('./order/order.module')).OrderModule
  
},

  {path:"**" ,component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
