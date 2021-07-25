import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.page.html',
  styleUrls: ['./add-offer.page.scss'],
})
export class AddOfferPage implements OnInit {
  offer: any = {};
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private cartService: CartService,
    private menuService: MenuService,
    private loadingCtrl: LoadingController
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const offer = this.router.getCurrentNavigation().extras.state;
      console.log('offer', offer);
      this.offer = offer;
    }
  }
  ngOnInit() {}
  getParsedOffer() {
    return this.offer;
  }
  async addToCart() {
    //this.calc();
    if (this.offer?.idOffer > 0) {
      const offer = this.getParsedOffer();
      await this.cartService.addOffer(offer);
      this.navCtrl.navigateRoot('/pages/menu');
    }
  }

  async selectProduct(item) {
    const idProduct = item?.idProduct || 0;
    const loading = await this.loadingCtrl.create({ message: 'Wait...' });
    loading.present();
    let product;
    try {
      product = await this.menuService.getProduct(idProduct).toPromise();
      console.log('obteined product', product);
      loading.dismiss();
    } catch (err) {
      console.log('err', err);
      loading.dismiss();
    }
    if (!product) {
      return;
    }
    this.navCtrl.navigateForward('/pages/select-product', {
      state: { product, offer: this.offer },
    });
  }
}
