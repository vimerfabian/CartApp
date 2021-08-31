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
    this.cart.resetCart();
    const url = environment.apiUrl + '/Client/login';
    const query = `?user=${username}&password=${password}`;
    const body = {}; //{ user: username, password };
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    this.http.post(url + query, body).subscribe(
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
          if (res?.status === 4) {
            title = 'Verify your email';
            color = 'warning';
            try {
              console.log('username', username);
              this.sendEmailCode(username).subscribe(
                (resEmail) => {
                  console.log('res email', resEmail);
                },
                (err) => {
                  console.log('err email', err);
                }
              );
            } catch (err) {}
          } else {
            title = res?.description || 'Error, invalid credentials!';
            color = 'danger';
          }
        }
        const toast = await this.toastCtrl.create({
          header: title,
          color,
          duration: 3000,
        });
        toast.present();
        if (res && res?.status !== 4) {
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

  sendEmailCode(email: string, type: number = 1) {
    return this.http.post(
      environment.apiUrl + `/Client/sendvalidation?email=${email}&Type=${type}`,
      {}
    );
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
