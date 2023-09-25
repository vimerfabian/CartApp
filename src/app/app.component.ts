import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentsService } from './services/component.service';
import { IMenu } from './models/menu.interface';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import { DeviceService } from './services/device.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: Observable<IMenu[]>;
  public labels = ['Opcion Rapida 1'];
  user: any = null;

  private inactivityTimeout = 3600;
  private inactivityTimer: any;

  constructor(
    public menuService: ComponentsService,
    public authService: AuthService,
    private deviceService: DeviceService,
    private platform: Platform,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.initializeApp();
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

  // Inicializa la lógica de seguimiento de inactividad.
  initializeApp() {
    this.platform.ready().then(() => {
      this.startInactivityTimer();
    });
  }

  startInactivityTimer() {
    const inactivityDuration = 1 * 60 * 1000; // 1 hora en milisegundos

    let inactivityTimer: any;

    this.platform.resume.subscribe(() => {
      // El usuario interactuó con la aplicación, reinicia el temporizador.
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        this.handleLogout(); // Realiza el cierre de sesión después de la inactividad.
      }, inactivityDuration);
    });

    this.platform.pause.subscribe(() => {
      // La aplicación está en segundo plano, limpia el temporizador.
      clearTimeout(inactivityTimer);
    });
  }

  handleLogout() {
    // Realiza el cierre de sesión: borra los datos de inicio de sesión y redirige al usuario al inicio de sesión.
    this.logout();
  }
}
