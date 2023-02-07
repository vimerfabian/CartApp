import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ErrorUtil } from '../common/utils/message.util';
import { CartService } from './cart.service';
import jwt_decode from 'jwt-decode';
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
    // this.http.get(environment.apiUrl + '/Client/getclient').subscribe(
    //   (res) => {
    //     console.log('res', res);
    //   },
    //   (err) => {
    //     console.log('err', err);
    //   }
    // );
    const url = environment.apiUrl + '/Client/login';
    const query = `?user=${username}&password=${password}`;
    const body = { user: username, password };
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    this.http.post(url, body).subscribe(
      async (res: any) => {
        console.log('res login', res);
        loading.dismiss();
        let title = '';
        let color = '';
        if (res && res?.client.status !== 4) {
          title = 'Login Success!';
          color = 'success';
          this.setCurrentSession(res);
        } else {
          if (res?.client.status === 4) {
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
        if (res && res?.client.status !== 4) {
          this.navCtrl.navigateRoot('/pages/offers', { replaceUrl: true });
          document.location.reload();
        }
      },
      async (err) => {
        const toast = await this.toastCtrl.create({
          header: ErrorUtil.getParsedError(err),
          color: 'danger',
          duration: 3000,
        });
        toast.present();
        console.log('err login', JSON.stringify(err));
        loading.dismiss();
      }
    );
  }

  logout() {
    this.cart.resetCart();
    this.setCurrentSession(null);
    this.navCtrl.navigateRoot('/auth/login', { replaceUrl: true }).then((r) => {
      document.location.reload();
    });
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
    const session: any = JSON.parse(localStorage.getItem('session'));
    console.log('session', session);
    return session?.client;
  }

  getCurrentToken() {
    const session: any = JSON.parse(localStorage.getItem('session'));
    return session?.token;
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
