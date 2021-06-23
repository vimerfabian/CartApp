import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './services/menu.service';
import {IMenu} from './models/menu.interface';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages: Observable<IMenu[]>;
  public labels = ['Opcion Rapida 1'];

  constructor(public menuService: MenuService) {}

  ngOnInit() {
    this.appPages = this.menuService.getMenuOptions() ;
  }
}
