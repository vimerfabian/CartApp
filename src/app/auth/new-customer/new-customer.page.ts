import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { HttpStatusEnum } from 'src/app/common/enums/http-status.enum';
import { ErrorUtil } from 'src/app/common/utils/message.util';
import { ReadTermsComponent } from 'src/app/components/read-terms/read-terms.component';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit {
  client: any = {};
  constructor(
    private clientService: ClientService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private auth: AuthService,
    private deviceService: DeviceService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.client.mac = await this.deviceService.getMac();
    console.log('client.mac', this.client.mac);
  }

  async save() {
    console.log('client', this.client);
    if (!this.isPasswordValid()) {
      const toastErr = await this.toastCtrl.create({
        header: 'Verify your password',
        color: 'warning',
        duration: 3500,
      });
      toastErr.present();
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();
    let title = 'Error';
    let color = 'danger';
    let message = 'Error';
    this.clientService.save(this.client).subscribe(
      (res: any) => {
        console.log('res', res);
        this.auth.sendEmailCode(this.client.email).subscribe(
          (resEmail) => {
            console.log('res email', resEmail);
          },
          (err) => {
            console.log('err email', err);
          }
        );
        title = 'Success, confirm your email';
        color = 'success';
        message = 'Check your email to confirm your account';
        this.navCtrl.navigateRoot('/auth/login');

        loading.dismiss();
      },
      (err) => {
        console.log('err', err);
        title = 'Error';
        message = ErrorUtil.getParsedError(err);
        color = 'danger';
        loading.dismiss();
      },
      async () => {
        const toast = await this.toastCtrl.create({
          header: title,
          color,
          duration: 3500,
          message,
        });
        await toast.present();
      }
    );
  }

  isPasswordValid() {
    return this.client.confirmPassword === this.client.password;
  }

  async readTerms() {
    const modal = await this.modalCtrl.create({
      component: ReadTermsComponent,
    });

    modal.present();
  }
}
