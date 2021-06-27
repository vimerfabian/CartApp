import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {
  user: any;
  constructor(private actionCtrl: ActionSheetController, private navCtrl: NavController,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentSession();
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
