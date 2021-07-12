import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  //cart: any = [];
  @ViewChild(IonContent) content: IonContent;
  constructor(
    private cartService: CartService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    //this.cartService.cart.subscribe(x => this.cart = x);
  }
  get cart() {
    return this.cartService.cart;
  }

  remove(item) {
    this.cartService.removeProduct(item.idProduct);
  }

  add(product: any, n: number) {
    if (product.quantity <= 1 && n < 0) {
      product.quantity = 1;
    } else {
      product.quantity += n;
    }
    this.cartService.addProduct(product);
  }

  goToCheckout() {
    if (this.cart.value.length < 1) {
      return;
    }
    this.navCtrl.navigateForward(['/pages/checkout']);
  }
  selectProduct(item) {
    this.navCtrl.navigateForward('/pages/select-product', { state: item });
  }
}
