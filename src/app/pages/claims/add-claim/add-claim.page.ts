import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ToastController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { HttpStatusEnum } from 'src/app/common/enums/http-status.enum';
import { ErrorUtil } from 'src/app/common/utils/message.util';
import { AuthService } from 'src/app/services/auth.service';
import { ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.page.html',
  styleUrls: ['./add-claim.page.scss'],
})
export class AddClaimPage implements OnInit {
  claim: any = {};
  order: any = {};
  constructor(
    private claimService: ClaimService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  async ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      const order = this.router.getCurrentNavigation().extras.state;
      this.order = order;
      console.log('order add claim', this.order);
    }
  }

  async save() {
    this.claim.idOrder = this.order.idOrder;
    this.claim.date = new Date();
    const user = this.authService.getCurrentSession();
    this.claim.idClient = user?.idClient;
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    let title = 'Error';
    let color = 'danger';
    let message = '';
    try {
      const date = new Date();
      const res: any = await this.claimService.save(this.claim).toPromise();

      title = 'Success';
      message = 'Claim Sended';
      color = 'success';
      this.navCtrl.navigateRoot('/pages/offers');

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
}
