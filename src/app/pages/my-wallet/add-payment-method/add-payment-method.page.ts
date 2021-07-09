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
  paymentMethodTypes: any = [];
  cityList: any = [];
  stateList: any = [];
  constructor(
    private walletService: WalletService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.paymentMethodTypes = await this.walletService
      .getPaymentMethodTypes()
      .toPromise();
    console.log('payment?MethodsTypes', this.paymentMethodTypes);
  }

  async save() {
    const isValid = await this.isValid().toPromise();
    console.log('isValid', isValid);
    console.log('reg', this.paymentMethod);
    if (!isValid) {
      this.toastCtrl
        .create({
          header: 'Validation Error',
          message: 'Invalid Card Number',
          color: 'danger',
          position: 'top',
        })
        .then((t) => {
          t.present();
        });
      return;
    }
    const cardType = '';
    try {
      await this.walletService
        .getCardType(this.paymentMethod.cardNumber)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
    console.log('cardType', cardType);

    const user = this.authService.getCurrentSession();
    this.paymentMethod.idClient = user?.idClient;
    this.paymentMethod.idCardType = 2;
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    let title = 'Error';
    let color = 'danger';
    let message = '';
    try {
      console.log('toBeSaved', this.paymentMethod);
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

  isValid() {
    return this.walletService.isCardValid(this.paymentMethod.cardNumber);
  }
}
