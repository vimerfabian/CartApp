import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentsService } from './services/component.service';
import {IMenu} from './models/menu.interface';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages: Observable<IMenu[]>;
  public labels = ['Opcion Rapida 1'];

  constructor(public menuService: ComponentsService) {}

  ngOnInit() {
    this.appPages = this.menuService.getMenuOptions() ;
  }
}
