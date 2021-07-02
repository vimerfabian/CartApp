import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentsService } from './services/component.service';
import {IMenu} from './models/menu.interface';
import { AuthService } from './services/auth.service';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages: Observable<IMenu[]>;
  public labels = ['Opcion Rapida 1'];
user: any = null;
  constructor(public menuService: ComponentsService, public authService: AuthService, private storage: Storage) {}

  ngOnInit() {
    this.storage.create();
    this.user = this.authService.getCurrentSession();
    console.log('user', this.user);
    this.appPages = this.menuService.getMenuOptions();
  }

  logout() {
    this.authService.logout();
  }
}
