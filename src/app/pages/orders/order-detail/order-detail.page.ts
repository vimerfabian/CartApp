import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  order: any = {};
  constructor(private router: Router, private navCtrl: NavController) {
    if (router.getCurrentNavigation().extras.state) {
      const order = this.router.getCurrentNavigation().extras.state;
      console.log('order', order);
      this.setOrder(order);
    }
  }

  setOrder(order) {
    this.order = order;
  }

  ngOnInit() {}

  addClaim(iem) {
    this.navCtrl.navigateForward('/pages/claims/add-claim', {
      state: this.order,
    });
  }
}
