import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TotalFooterComponent } from './total-footer/total-footer.component';
import { CountDownComponent } from './count-down/count-down.component';
import { OrderStatusComponent } from './order-status/order-status.component';

@NgModule({
  declarations: [
    CartStatusComponent,
    TotalFooterComponent,
    CountDownComponent,
    OrderStatusComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  exports: [
    CartStatusComponent,
    TotalFooterComponent,
    CountDownComponent,
    OrderStatusComponent,
  ],
  entryComponents: [CountDownComponent],
})
export class ComponentsModule {}
