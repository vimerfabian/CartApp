import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit {
  client: any = {};
  constructor(private clientService: ClientService, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private navCtrl: NavController ) { }

  ngOnInit() {
  }

  async save() {
    console.log('client', this.client);
    if(!this.isPasswordValid()) {
     const toastErr = await  this.toastCtrl.create({
        header: 'Verify your password',
        color: 'warning',
        duration: 3500
      });
      toastErr.present();
      return;
    }
   const loading = await this.loadingCtrl.create({
     message: 'Loading...'
   });
   loading.present();
   let title = 'Error';
   let color = 'danger';
   let message = 'Error';
    this.clientService.save(this.client).subscribe((res: any) => {
      console.log('res', res);
     if(res?.idEstado === 1) {
      title = 'Success, confirm your email';
      color = 'success';
      message = res?.nombre;
      this.navCtrl.navigateRoot('/auth/login');
     } else {
       message = res?.descripcion;
       console.log('message', message);
     }
     loading.dismiss();
    }, err => {
      console.log('err', err);
      title = 'Error';
      color = 'danger';
      loading.dismiss();
    }, async () => {
      const toast = await this.toastCtrl.create({
        header: title,
        color,
        duration: 3500,
        message
        });
        await toast.present();
    });
  }

  isPasswordValid() {
    return  this.client.confirmPassword === this.client.password;
  }

}
