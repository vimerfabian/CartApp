import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {

  constructor(private actionCtrl: ActionSheetController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async showActions(event) {
    const action = await this.actionCtrl.create({
      header: 'Acciones',
      buttons: [
        {
          icon: 'person',
          text: 'Change Password',
          handler: () => {
            this.navCtrl.navigateForward('/auth/reset-password');
          },
        },
        {
          icon: 'close',
          text: 'Cancel',
          role: 'cancel'
        },
      ],
    });
    action.present();
  }

}
