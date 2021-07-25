import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private cart: CartService
  ) {}

  async login(username: string, password: string) {
    const url = environment.apiUrl + '/Client/login';
    const query = `?user=${username}&password=${password}`;
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    this.http.post(url + query, {}).subscribe(
      async (res: any) => {
        console.log('res login', res);
        loading.dismiss();
        let title = '';
        let color = '';
        if (res && res?.status !== 4) {
          title = 'Login Success!';
          color = 'success';
          this.setCurrentSession(res);
        } else {
          title = 'Error, invalid credentials!';
          color = 'danger';
        }
        const toast = await this.toastCtrl.create({
          header: title,
          color,
          duration: 3000,
        });
        toast.present();
        if (res) {
          this.navCtrl.navigateRoot('/pages/offers', { replaceUrl: true });
          document.location.reload();
        }
      },
      (err) => {
        console.log('err login', err);
        loading.dismiss();
      }
    );
  }

  logout() {
    this.cart.resetCart();
    this.setCurrentSession(null);
    this.navCtrl.navigateRoot('/auth/login', { replaceUrl: true });
    document.location.reload();
  }

  exitFromLogin() {
    if (this.isValidSession()) {
      this.navCtrl.navigateRoot('/pages/offers', { replaceUrl: true });
    }
  }

  isValidSession() {
    const session = this.getCurrentSession();
    if (session) {
      return true;
    }
    return false;
  }

  getCurrentSession() {
    return JSON.parse(localStorage.getItem('session'));
  }

  setCurrentSession(session: any) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  forgotPassword(email: string, type: number = 1) {
    return this.http.post(
      environment.apiUrl + `/Client/resetpassword?email=${email}&Type=${type}`,
      {}
    );
  }
  changePassword(idClient: string, oldPassword: string, newPassword: string) {
    return this.http.post(environment.apiUrl + `/Client/changepassword`, {
      idClient,
      oldPassword,
      newPassword,
    });
  }
}
