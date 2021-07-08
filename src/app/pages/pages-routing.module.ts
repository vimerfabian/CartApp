import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'offers',
    pathMatch: 'full'
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'my-info',
    loadChildren: () => import('./my-info/my-info.module').then( m => m.MyInfoPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'select-product',
    loadChildren: () => import('./select-product/select-product.module').then( m => m.SelectProductPageModule)
  },
  {
    path: 'my-order',
    loadChildren: () => import('./my-order/my-order.module').then( m => m.MyOrderPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'my-wallet',
    loadChildren: () => import('./my-wallet/my-wallet.module').then( m => m.MyWalletPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
