import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { DeviceService } from 'src/app/services/device.service';

import { ThemeDetectionService } from '../../theme-detection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {};
  constructor(
    private authService: AuthService,
    private storage: Storage,
    private deviceService: DeviceService,
    private themeDetection: ThemeDetectionService
  ) {}

  async ngOnInit() {
    this.authService.exitFromLogin();
    this.user.mac = await this.deviceService.getMac();
    console.log('client.mac', this.user.mac);
  }

  login() {
    this.authService.login(this.user.username, this.user.password);
  }

  public toggleTheme(event) {
    this.themeDetection.toggleTheme(event);
  }

  public isDarkTheme() {
    return this.themeDetection.isDarkTheme();
  }
}
