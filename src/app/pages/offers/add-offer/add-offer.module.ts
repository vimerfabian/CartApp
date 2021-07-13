import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOfferPageRoutingModule } from './add-offer-routing.module';

import { AddOfferPage } from './add-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOfferPageRoutingModule
  ],
  declarations: [AddOfferPage]
})
export class AddOfferPageModule {}
