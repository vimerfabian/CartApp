import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentsService } from './services/component.service';
import { IMenu } from './models/menu.interface';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import { DeviceService } from './services/device.service';

import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

import { ThemeDetectionService } from './theme-detection.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: Observable<IMenu[]>;
  public labels = ['Opcion Rapida 1'];
  user: any = null;

  intervalInMilliseconds = 1 * 60 * 1000; // 5 minutos
  // Configura el intervalo para ejecutar la función
  intervalId = setInterval(
    this.authService.checkToken,
    this.intervalInMilliseconds
  );

  constructor(
    public menuService: ComponentsService,
    public authService: AuthService,
    private deviceService: DeviceService,
    private storage: Storage,
    private platform: Platform,
    private themeDetection: ThemeDetectionService
  ) {}

  ngOnInit() {
    this.authService.checkToken();
    this.themeDetection.applySavedTheme();
    this.deviceService.getPlatform();
    this.storage.create();
    this.user = this.authService.getCurrentSession();
    console.log('user', this.user);
    this.appPages = this.menuService.getMenuOptions();
    try {
      this.deviceService.getMac();
    } catch (err) {}
  }

  logout() {
    this.authService.logout();
  }

  public toggleTheme(event) {
    this.themeDetection.toggleTheme(event);
  }

  public isDarkTheme() {
    return this.themeDetection.isDarkTheme();
  }
}
