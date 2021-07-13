import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.page.html',
  styleUrls: ['./add-offer.page.scss'],
})
export class AddOfferPage implements OnInit {
  offer: any = {};
  constructor(private router: Router, private navCtrl: NavController) {
    if (router.getCurrentNavigation().extras.state) {
      const offer = this.router.getCurrentNavigation().extras.state;
      console.log('offer', offer);
      this.offer = offer;
    }
  }
  ngOnInit() {}
}
