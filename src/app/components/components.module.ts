import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TotalFooterComponent } from './total-footer/total-footer.component';



@NgModule({
  declarations: [CartStatusComponent, TotalFooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  exports: [CartStatusComponent, TotalFooterComponent]
})
export class ComponentsModule { }
