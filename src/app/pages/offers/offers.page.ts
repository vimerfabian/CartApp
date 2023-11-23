import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OffersService } from 'src/app/services/offers.service';
import { Platform } from '@ionic/angular';
import {
  ELocalNotificationTriggerUnit,
  LocalNotifications,
} from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  list: any[];
  test: any;
  weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  constructor(
    private offerService: OffersService,
    private navCtrl: NavController,
    private cart: CartService,
    private alertCtrl: AlertController,
    private plt: Platform,
    private localNotifications: LocalNotifications
  ) {
    /*
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe((res) => {
        console.log('click: ', res);
        const msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
      this.localNotifications.on('trigger').subscribe((res) => {
        console.log('trigger: ', res);
        const msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });
    */
  }

  async ngOnInit() {
    //debugger;
    const res = await this.offerService.getList().toPromise();
    const now = Number(new Date());
    this.list = res; /*?.filter((x) => {
      return true;
      //debugger;
      const startDate = Number(new Date(x.startTime));
      const endDate = Number(new Date(x.endTime));
      const days = this.getDays(x);
      const includeToday = days.includes(
        this.getDayByNumber(new Date().getDay())
      );
      return now < endDate && now > startDate && includeToday;
    });*/

    //this.test = this.offerService.getTest();

    // if (typeof cordova !== 'undefined' && cordova.plugins.notification.local) {
    //   // Verifica si la aplicación tiene permisos de notificación
    //   cordova.plugins.notification.local.hasPermission((granted: any) => {
    //     if (!granted) {
    //       cordova.plugins.notification.local.requestPermission(
    //         (granted: any) => {
    //           if (granted) {
    //             this.scheduleNotification();
    //             console.log(
    //               'Permisos de notificación locales otorgados en Android.'
    //             );
    //           } else {
    //             console.error(
    //               'El usuario denegó los permisos de notificación locales en Android.'
    //             );
    //           }
    //         }
    //       );
    //     } else {
    //       this.scheduleNotification();
    //     }
    //   });
    // } else {
    //   console.error(
    //     'Cordova y/o el plugin de notificaciones locales no están disponibles.'
    //   );
    // }
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Jhon`s Notification',
      data: { mydata: 'My hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true,
    });
  }

  showAlert(header, sub, msg) {
    this.alertCtrl
      .create({
        header,
        subHeader: sub,
        message: msg,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }

  getDays(item) {
    let days = '';
    if (item?.monday) days += ',Monday';
    if (item?.tuesday) days += ',Tuesday';
    if (item?.wednesday) days += ',Wednesday';
    if (item?.thursday) days += ',Thursday';
    if (item?.friday) days += ',Friday';
    if (item?.saturday) days += ',Saturday';
    if (item?.sunday) days += ',Sunday';
    //if(days.length > 0) days = '';
    return days;
  }

  getDayByNumber(day: number) {
    return this.weekday[day] || 'Monday';
  }

  selectOffer(item) {
    this.navCtrl.navigateForward('/pages/offers/add-offer', {
      state: item,
    });
  }
}
