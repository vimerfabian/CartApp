import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClaimPage } from './add-claim/add-claim.page';

import { ClaimsPage } from './claims.page';

const routes: Routes = [
  {
    path: '',
    component: AddClaimPage,
  },
  {
    path: 'add-claim',
    loadChildren: () =>
      import('./add-claim/add-claim.module').then((m) => m.AddClaimPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsPageRoutingModule {}
