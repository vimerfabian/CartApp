import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { DeviceService } from 'src/app/services/device.service';

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
    private deviceService: DeviceService
  ) {}

  async ngOnInit() {
    this.authService.exitFromLogin();
    this.user.mac = await this.deviceService.getMac();
    console.log('client.mac', this.user.mac);
  }

  login() {
    this.authService.login(this.user.username, this.user.password);
  }
}
