import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { HttpStatusEnum } from 'src/app/common/enums/http-status.enum';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  address: any = {};
  cityList: any = [];
  stateList: any = [];
  constructor(
    private addressService: AddressService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.cityList = await this.addressService.getCityList().toPromise();
    this.stateList = await this.addressService.getStateList().toPromise();
  }

  async save() {
    const user = this.authService.getCurrentSession();
    this.address.idClient = user?.idClient;
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    let title = 'Error';
    let color = 'danger';
    let message = '';
    try {
      const res: any = await this.addressService.save(this.address).toPromise();

      title = 'Success';
      message = 'Address Updated';
      color = 'success';
      this.navCtrl.navigateRoot('/pages/address');

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
