import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

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
    private cartService: CartService
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
      //await this.cartService.addOffer(offer);
      this.navCtrl.navigateRoot('/pages/menu');
    }
  }
}
