import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss'],
})
export class CartStatusComponent implements OnInit {
  cartCount = 0;
  totalPrice = 0;
  constructor(
    private cartService: CartService,
    private navCtrl: NavController,
    private addressService: AddressService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.cartService.cartCount.subscribe((x) => {
      this.cartCount = x;
    });
    this.cartService.totalPrice.subscribe((x) => {
      this.totalPrice = x;
    });
  }

  async userHaveAddress() {}

  async goToCart() {
    const userHaveAddress = await this.addressService.checkUserHaveAddress();
    if (!userHaveAddress) {
      this.addressService.goToAddAddressPage();
      this.toast
        .create({
          header: 'Warning',
          message: 'Create an address before buy',
          color: 'warning',
          duration: 3000,
        })
        .then((t) => {
          t.present();
        });
      return;
    }
    if (this.cartCount < 1) {
      this.toast
        .create({
          header: 'Warning',
          message: 'Select one product',
          color: 'warning',
          duration: 3000,
        })
        .then((t) => {
          t.present();
        });
      return;
    }
    this.navCtrl.navigateForward(['/pages/my-order']);
  }
}
