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
  offers: any = [];
  constructor(
    private cartService: CartService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    //this.cartService.cart.subscribe(x => this.cart = x);
    this.offers = await this.cartService.getOffers();
    console.log('offers', this.offers);
  }
  get cart() {
    return this.cartService.cart;
  }

  editOffer(item) {
    this.navCtrl.navigateForward('/pages/offers/add-offer', {
      state: item,
    });
  }

  remove(item, idx: number) {
    this.cartService.removeProductByIndex(idx);
  }

  async removeOffer(item) {
    this.offers = await this.cartService.removeOffer(item.idOffer);
  }

  add(product: any, n: number) {
    if (product.quantity <= 1 && n < 0) {
      product.quantity = 1;
    } else {
      product.quantity += n;
    }
    this.cartService.addProduct(product, true);
  }

  goToCheckout() {
    if (this.cart.value.length < 1) {
      return;
    }
    this.navCtrl.navigateForward(['/pages/checkout']);
  }
  selectProduct(item) {
    this.navCtrl.navigateForward('/pages/select-product', {
      state: { product: item, offer: {}, edit: true },
    });
  }
}
