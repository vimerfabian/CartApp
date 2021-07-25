import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOfferPageRoutingModule } from './add-offer-routing.module';

import { AddOfferPage } from './add-offer.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOfferPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [AddOfferPage],
})
export class AddOfferPageModule {}
