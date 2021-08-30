import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { HttpStatusEnum } from 'src/app/common/enums/http-status.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  entity: any = {};
  constructor(
    private auth: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async save() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    let title = 'Error';
    let color = 'danger';
    let message = '';
    try {
      const user = this.auth.getCurrentSession();
      const idClient = user?.idClient;
      const date = new Date();
      const res: any = await this.auth
        .changePassword(
          idClient,
          this.entity.current_password,
          this.entity.password
        )
        .toPromise();
      console.log('res', res);
      title = 'Success';
      message = 'Password Updated';
      color = 'success';
      this.auth.logout();
      console.log('res', res);
    } catch (err) {
      color = 'danger';
      message = 'Error';
      console.log('err', err);
    }
    loading.dismiss();

    const toast = await this.toastCtrl.create({
      header: title,
      color,
      duration: 3000,
      message,
    });
    toast.present();
  }
}
