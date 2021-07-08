import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { HttpStatusEnum } from 'src/app/common/enums/http-status.enum';
import { AuthService } from 'src/app/services/auth.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.page.html',
  styleUrls: ['./add-payment-method.page.scss'],
})
export class AddPaymentMethodPage implements OnInit {
  paymentMethod: any = {};
  cityList: any = [];
  stateList: any = [];
  constructor(
    private walletService: WalletService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {}

  async save() {
    console.log('reg', this.paymentMethod);
    return;
    const user = this.authService.getCurrentSession();
    this.paymentMethod.idClient = user?.idClient;
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    let title = 'Error';
    let color = 'danger';
    let message = '';
    try {
      const res: any = await this.walletService
        .save(this.paymentMethod)
        .toPromise();
      if (res?.idEstado === HttpStatusEnum.EXITOSO) {
        title = 'Success';
        message = 'Payment Method Updated';
        color = 'success';
        this.navCtrl.navigateRoot('/pages/my-wallet');
      } else {
        message = res?.descripcion;
      }
      console.log('res', res);
    } catch (err) {
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
