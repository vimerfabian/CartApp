import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyWalletPage } from './my-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: MyWalletPage
  },
  {
    path: 'add-payment-method',
    loadChildren: () => import('./add-payment-method/add-payment-method.module').then( m => m.AddPaymentMethodPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyWalletPageRoutingModule {}
