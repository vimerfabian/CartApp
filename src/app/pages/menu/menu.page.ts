import { Component, OnInit } from '@angular/core';
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
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.list = this.menuService.getCategoryList();
  }

}
