import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  show: false;
  list: Observable<any>;
  constructor(private menuService: MenuService, private navCtrl: NavController) { }

  ngOnInit() {
    this.list = this.menuService.getCategoryList();
  }

  selectProduct(item) {
    this.navCtrl.navigateForward('/pages/select-product', { state: item });
  }

}
