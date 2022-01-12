import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { HttpStatusEnum } from 'src/app/common/enums/http-status.enum';
import { ErrorUtil } from 'src/app/common/utils/message.util';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {
  user: any;
  constructor(
    private actionCtrl: ActionSheetController,
    private navCtrl: NavController,
    private authService: AuthService,
    private clientService: ClientService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentSession();
  }

  async save() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    let title = 'Error';
    let color = 'danger';
    let message = '';
    try {
      const res: any = await this.clientService.save(this.user).toPromise();
      const updatedUser = await this.clientService
        .get(this.user?.idClient)
        .toPromise();
      if (updatedUser) {
        this.authService.setCurrentSession(updatedUser);
      }
      title = 'Success';
      message = 'My Info Updated';
      color = 'success';

      console.log('res', res);
    } catch (err) {
      color = 'danger';
      message = ErrorUtil.getParsedError(err);
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

  async showActions(event) {
    const action = await this.actionCtrl.create({
      header: 'Acciones',
      buttons: [
        {
          icon: 'create',
          text: 'Change Password',
          handler: () => {
            this.navCtrl.navigateForward('/auth/reset-password');
          },
        },
        {
          icon: 'close',
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    action.present();
  }
}
