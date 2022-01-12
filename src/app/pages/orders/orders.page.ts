import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  list: any = [];
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  async updateList() {
    const user = this.authService.getCurrentSession();
    const list = await this.orderService.getList(user?.idClient).toPromise();
    console.log('list', list);
    this.list = list;
  }

  ionViewWillEnter() {
    this.updateList();
  }

  seeDetail(item) {
    this.navCtrl.navigateForward('/pages/orders/order-detail', { state: item });
  }
}
