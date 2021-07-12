import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClaimPageRoutingModule } from './add-claim-routing.module';

import { AddClaimPage } from './add-claim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddClaimPageRoutingModule
  ],
  declarations: [AddClaimPage]
})
export class AddClaimPageModule {}
