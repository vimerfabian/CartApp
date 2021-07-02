import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  show: false;
  list: Observable<any>;
  cartCount = 0;
  totalPrice = 0;
  constructor(private menuService: MenuService, private navCtrl: NavController, public cartService: CartService) {
   }

  ngOnInit() {
    this.cartService.cartCount.subscribe(x => {
      this.cartCount = x;
    });
    this.cartService.totalPrice.subscribe(x => {
      this.totalPrice = x;
    });
    this.list = this.menuService.getCategoryList();
  }

  selectProduct(item) {
    this.navCtrl.navigateForward('/pages/select-product', { state: item });
  }

}
