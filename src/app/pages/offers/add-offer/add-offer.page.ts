import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.page.html',
  styleUrls: ['./add-offer.page.scss'],
})
export class AddOfferPage implements OnInit {
  offer: any = {};
  isValid = false;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private cartService: CartService,
    private menuService: MenuService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
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
  ionViewWillEnter() {
    console.log('entering');
    this.checkOfferSelectionIsValid();
  }
  checkOfferSelectionIsValid() {
    let isValid = true;
    console.log('cart status', this.cartService.cart.value);
    for (const x of this.offer.products) {
      const quantitySelected = this.cartService.cart.value
        .filter(
          (cp) =>
            cp.idProduct === x.idProduct && cp.idOffer === this.offer.idOffer
        )
        // eslint-disable-next-line arrow-body-style
        .reduce((a, b) => {
          return Number(a) + Number(b.quantity);
        }, 0);
      console.log('quantity-s of: ', x.name, 'is', quantitySelected);
      x.quantitySelected = quantitySelected;
      if (x.quantitySelected !== x.quantity) {
        isValid = false;
      }
      //return { ...x, quantitySelected };
    }
    this.isValid = isValid;
  }

  async removeProducts(item) {
    console.log('item', item);
    const list = this.cartService.cart.value.filter(
      (x) => x.idProduct === item.idProduct && x.idOffer === item.idOffer
    );
    console.log('find', list);
    await Promise.all(
      list.map(async (x) => {
        console.log('removing', x);
        await this.cartService.removeProductByIdInOffer(
          x.idProduct,
          this.offer.idOffer
        );
        console.log('removed');
      })
    );
    console.log('checking');
    setTimeout(() => {
      this.checkOfferSelectionIsValid();
    }, 600);
  }
  async cancelOffer() {
    await this.cartService.removeOffer(this.offer.idOffer);
    this.navCtrl.navigateBack('/pages/offers');
  }

  async confirmCancelOffer() {
    const toast = await this.toastCtrl.create({
      header: 'Cancel Offer Selection',
      color: 'warning',
      buttons: [
        {
          role: 'cancel',
          text: 'Continue with offer',
        },
        {
          role: 'ok',
          text: 'Remove Offer',
          handler: async () => {
            await this.cancelOffer();
          },
        },
      ],
    });
    await toast.present();
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
      const quantityOffer = item.quantity;
      product.quantityOffer = quantityOffer;
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
