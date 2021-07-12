import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cartService.cartCount.subscribe((x) => {
      this.cartCount = x;
    });
    this.cartService.totalPrice.subscribe((x) => {
      this.totalPrice = x;
    });
  }

  goToCart() {
    if (this.cartCount < 1) {
      return;
    }
    this.navCtrl.navigateForward(['/pages/my-order']);
  }
}
