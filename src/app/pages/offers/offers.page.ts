import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OffersService } from 'src/app/services/offers.service';

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
    private cart: CartService
  ) {}

  async ngOnInit() {
    const res = await this.offerService.getList().toPromise();
    const now = Number(new Date());
    this.list = res?.filter((x) => {
      const startDate = Number(new Date(x.startTime));
      const endDate = Number(new Date(x.endTime));
      const days = this.getDays(x);
      const includeToday = days.includes(
        this.getDayByNumber(new Date().getDay())
      );
      return now < endDate && now > startDate && includeToday;
    });

    //this.test = this.offerService.getTest();
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
